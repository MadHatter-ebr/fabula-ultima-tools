-- Fabula Ultima Tools Database Setup
-- Complete database schema with tables, RLS policies, and admin functions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');
CREATE TYPE character_status AS ENUM ('active', 'archived', 'dead');
CREATE TYPE campaign_status AS ENUM ('planning', 'active', 'completed', 'paused');

-- =============================================
-- USER PROFILES TABLE
-- =============================================
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'user',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- CHARACTERS TABLE
-- =============================================
CREATE TABLE characters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    identity TEXT,
    theme TEXT,
    origin TEXT,
    attributes JSONB NOT NULL DEFAULT '{}',
    classes JSONB NOT NULL DEFAULT '[]',
    traits TEXT[] DEFAULT ARRAY[]::TEXT[],
    heroic_styles TEXT[] DEFAULT ARRAY[]::TEXT[],
    avatar_url TEXT,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    hp_current INTEGER DEFAULT 40,
    hp_max INTEGER DEFAULT 40,
    mp_current INTEGER DEFAULT 40,
    mp_max INTEGER DEFAULT 40,
    ip_current INTEGER DEFAULT 5,
    ip_max INTEGER DEFAULT 5,
    fabula_points INTEGER DEFAULT 3,
    status character_status DEFAULT 'active',
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- CAMPAIGNS TABLE
-- =============================================
CREATE TABLE campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    gm_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    status campaign_status DEFAULT 'planning',
    max_players INTEGER DEFAULT 6,
    current_session INTEGER DEFAULT 0,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- CAMPAIGN MEMBERS TABLE
-- =============================================
CREATE TABLE campaign_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
    role TEXT DEFAULT 'player', -- 'player', 'co-gm'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    UNIQUE(campaign_id, user_id)
);

-- =============================================
-- INVENTORY TABLE
-- =============================================
CREATE TABLE inventory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'weapons', 'armor', 'accessories', 'consumables', 'materials', 'misc'
    quantity INTEGER DEFAULT 1,
    weight INTEGER DEFAULT 1,
    value INTEGER DEFAULT 0,
    rarity TEXT DEFAULT 'common', -- 'common', 'uncommon', 'rare', 'epic', 'legendary'
    description TEXT,
    properties JSONB DEFAULT '{}', -- weapon damage, armor defense, special abilities
    equipped BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- COMBAT SESSIONS TABLE
-- =============================================
CREATE TABLE combat_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    gm_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'preparation', -- 'preparation', 'active', 'completed'
    current_round INTEGER DEFAULT 1,
    current_turn INTEGER DEFAULT 0,
    combatants JSONB NOT NULL DEFAULT '[]',
    combat_log TEXT[] DEFAULT ARRAY[]::TEXT[],
    metadata JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- DICE ROLLS TABLE
-- =============================================
CREATE TABLE dice_rolls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
    combat_session_id UUID REFERENCES combat_sessions(id) ON DELETE SET NULL,
    roll_type TEXT NOT NULL, -- 'attribute', 'attack', 'magic', 'defense', 'initiative'
    attribute1 TEXT NOT NULL,
    attribute1_type TEXT NOT NULL, -- 'd6', 'd8', 'd10', 'd12'
    attribute1_value INTEGER NOT NULL,
    attribute2 TEXT NOT NULL,
    attribute2_type TEXT NOT NULL,
    attribute2_value INTEGER NOT NULL,
    modifier INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    is_critical BOOLEAN DEFAULT FALSE,
    is_fumble BOOLEAN DEFAULT FALSE,
    is_high_roll BOOLEAN DEFAULT FALSE,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- ADVENTURES TABLE
-- =============================================
CREATE TABLE adventures (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content JSONB NOT NULL DEFAULT '{}', -- generated adventure content
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_public BOOLEAN DEFAULT FALSE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- ADMIN LOGS TABLE
-- =============================================
CREATE TABLE admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT, -- 'user', 'character', 'campaign', etc.
    target_id UUID,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_characters_user_id ON characters(user_id);
CREATE INDEX idx_characters_status ON characters(status);
CREATE INDEX idx_campaign_members_campaign_id ON campaign_members(campaign_id);
CREATE INDEX idx_campaign_members_user_id ON campaign_members(user_id);
CREATE INDEX idx_inventory_character_id ON inventory(character_id);
CREATE INDEX idx_inventory_equipped ON inventory(equipped) WHERE equipped = TRUE;
CREATE INDEX idx_combat_sessions_campaign_id ON combat_sessions(campaign_id);
CREATE INDEX idx_combat_sessions_status ON combat_sessions(status);
CREATE INDEX idx_dice_rolls_user_id ON dice_rolls(user_id);
CREATE INDEX idx_dice_rolls_character_id ON dice_rolls(character_id);
CREATE INDEX idx_dice_rolls_created_at ON dice_rolls(created_at);
CREATE INDEX idx_adventures_user_id ON adventures(user_id);
CREATE INDEX idx_adventures_public ON adventures(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE combat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dice_rolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Characters Policies
CREATE POLICY "Users can view own characters" ON characters
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own characters" ON characters
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own characters" ON characters
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own characters" ON characters
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Campaign members can view characters in their campaigns" ON characters
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM campaign_members cm
            JOIN campaigns c ON c.id = cm.campaign_id
            WHERE cm.user_id = auth.uid() AND cm.character_id = characters.id
        )
    );

-- Campaigns Policies
CREATE POLICY "GMs can manage their campaigns" ON campaigns
    FOR ALL USING (auth.uid() = gm_id);

CREATE POLICY "Campaign members can view campaigns" ON campaigns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_id = campaigns.id AND user_id = auth.uid()
        )
    );

-- Campaign Members Policies
CREATE POLICY "GMs can manage campaign members" ON campaign_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM campaigns
            WHERE id = campaign_members.campaign_id AND gm_id = auth.uid()
        )
    );

CREATE POLICY "Users can view campaign members in their campaigns" ON campaign_members
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM campaign_members cm2
            WHERE cm2.campaign_id = campaign_members.campaign_id AND cm2.user_id = auth.uid()
        )
    );

-- Inventory Policies
CREATE POLICY "Users can manage inventory of their characters" ON inventory
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM characters
            WHERE id = inventory.character_id AND user_id = auth.uid()
        )
    );

-- Combat Sessions Policies
CREATE POLICY "GMs can manage their combat sessions" ON combat_sessions
    FOR ALL USING (auth.uid() = gm_id);

CREATE POLICY "Campaign members can view combat sessions" ON combat_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_id = combat_sessions.campaign_id AND user_id = auth.uid()
        )
    );

-- Dice Rolls Policies
CREATE POLICY "Users can view own dice rolls" ON dice_rolls
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create dice rolls" ON dice_rolls
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Campaign members can view dice rolls in their sessions" ON dice_rolls
    FOR SELECT USING (
        combat_session_id IS NULL OR
        EXISTS (
            SELECT 1 FROM combat_sessions cs
            JOIN campaign_members cm ON cm.campaign_id = cs.campaign_id
            WHERE cs.id = dice_rolls.combat_session_id AND cm.user_id = auth.uid()
        )
    );

-- Adventures Policies
CREATE POLICY "Users can manage own adventures" ON adventures
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public adventures are viewable by all" ON adventures
    FOR SELECT USING (is_public = TRUE);

-- Admin Logs Policies (Admin only)
CREATE POLICY "Admins can view admin logs" ON admin_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can create admin logs" ON admin_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, username, display_name)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'username',
        NEW.raw_user_meta_data->>'display_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters 
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns 
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory 
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_combat_sessions_updated_at BEFORE UPDATE ON combat_sessions 
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_adventures_updated_at BEFORE UPDATE ON adventures 
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- =============================================
-- ADMIN FUNCTIONS
-- =============================================

-- Function to promote user to admin (can only be called by existing admin)
CREATE OR REPLACE FUNCTION promote_user_to_admin(target_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_user_role user_role;
BEGIN
    -- Check if current user is admin
    SELECT role INTO current_user_role 
    FROM user_profiles 
    WHERE id = auth.uid();
    
    IF current_user_role != 'admin' THEN
        RAISE EXCEPTION 'Only admins can promote users';
    END IF;
    
    -- Promote the user
    UPDATE user_profiles 
    SET role = 'admin' 
    WHERE id = target_user_id;
    
    -- Log the action
    INSERT INTO admin_logs (admin_id, action, target_type, target_id, details)
    VALUES (auth.uid(), 'promote_to_admin', 'user', target_user_id, '{}');
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user statistics (admin only)
CREATE OR REPLACE FUNCTION get_user_statistics()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Check if current user is admin
    IF NOT EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Only admins can access user statistics';
    END IF;
    
    SELECT json_build_object(
        'total_users', (SELECT COUNT(*) FROM user_profiles),
        'total_characters', (SELECT COUNT(*) FROM characters),
        'active_characters', (SELECT COUNT(*) FROM characters WHERE status = 'active'),
        'total_campaigns', (SELECT COUNT(*) FROM campaigns),
        'active_campaigns', (SELECT COUNT(*) FROM campaigns WHERE status = 'active'),
        'total_dice_rolls', (SELECT COUNT(*) FROM dice_rolls),
        'total_combat_sessions', (SELECT COUNT(*) FROM combat_sessions),
        'users_by_role', (
            SELECT json_object_agg(role, count)
            FROM (
                SELECT role, COUNT(*) as count
                FROM user_profiles
                GROUP BY role
            ) role_counts
        ),
        'characters_by_level', (
            SELECT json_object_agg(level_range, count)
            FROM (
                SELECT 
                    CASE 
                        WHEN level BETWEEN 1 AND 10 THEN '1-10'
                        WHEN level BETWEEN 11 AND 20 THEN '11-20'
                        WHEN level BETWEEN 21 AND 30 THEN '21-30'
                        WHEN level BETWEEN 31 AND 40 THEN '31-40'
                        ELSE '40+'
                    END as level_range,
                    COUNT(*) as count
                FROM characters
                GROUP BY level_range
            ) level_counts
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- INITIAL DATA
-- =============================================

-- Create initial admin user (you'll need to update this with your actual user ID after signup)
-- INSERT INTO user_profiles (id, username, display_name, role) 
-- VALUES ('your-user-id-here', 'admin', 'Administrator', 'admin');

-- Sample data (optional - remove in production)
-- INSERT INTO characters (user_id, name, identity, theme, origin, attributes, classes) VALUES
-- ('your-user-id-here', 'Demo Warrior', 'Brave Knight', 'Justice', 'Noble House', 
--  '{"dexterity": 10, "insight": 8, "might": 12, "willpower": 6}', 
--  '[{"classKey": "guardian", "level": 5, "abilities": {"Protect": true, "Taunt": true}}]');

COMMENT ON TABLE user_profiles IS 'User profile information and roles';
COMMENT ON TABLE characters IS 'Player characters with stats and equipment';
COMMENT ON TABLE campaigns IS 'Game campaigns managed by GMs';
COMMENT ON TABLE campaign_members IS 'Players participating in campaigns';
COMMENT ON TABLE inventory IS 'Character equipment and items';
COMMENT ON TABLE combat_sessions IS 'Combat encounters and battle tracking';
COMMENT ON TABLE dice_rolls IS 'Dice roll history and statistics';
COMMENT ON TABLE adventures IS 'Generated adventures and scenarios';
COMMENT ON TABLE admin_logs IS 'Administrative action logging';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
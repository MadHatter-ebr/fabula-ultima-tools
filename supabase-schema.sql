-- Fabula Ultima Tools Database Schema
-- Run this in your Supabase SQL editor

-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create characters table
CREATE TABLE IF NOT EXISTS characters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    identity TEXT,
    theme TEXT,
    origin TEXT,
    attributes JSONB NOT NULL DEFAULT '{
        "might": 8,
        "dexterity": 8,
        "intellect": 8,
        "willpower": 8
    }',
    classes JSONB NOT NULL DEFAULT '{
        "primary": null,
        "secondary": null
    }',
    hit_points INTEGER DEFAULT 40,
    mind_points INTEGER DEFAULT 40,
    current_hp INTEGER DEFAULT 40,
    current_mp INTEGER DEFAULT 40,
    inventory_points INTEGER DEFAULT 6,
    fabula_points INTEGER DEFAULT 3,
    traits TEXT[] DEFAULT '{}',
    bonds TEXT[] DEFAULT '{}',
    equipment JSONB DEFAULT '[]',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    gm_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    world_setting TEXT,
    current_session INTEGER DEFAULT 1,
    player_characters UUID[] DEFAULT '{}',
    npcs JSONB DEFAULT '[]',
    locations JSONB DEFAULT '[]',
    plot_hooks TEXT[] DEFAULT '{}',
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create combat sessions table
CREATE TABLE IF NOT EXISTS combat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    gm_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    combatants JSONB NOT NULL DEFAULT '[]',
    current_turn INTEGER DEFAULT 0,
    round_number INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dice rolls table (for logging/statistics)
CREATE TABLE IF NOT EXISTS dice_rolls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
    combat_session_id UUID REFERENCES combat_sessions(id) ON DELETE CASCADE,
    roll_type TEXT NOT NULL, -- 'attribute_check', 'damage', 'healing', etc.
    dice_used JSONB NOT NULL, -- ['d8', 'd10'] etc.
    modifier INTEGER DEFAULT 0,
    total_result INTEGER NOT NULL,
    is_critical BOOLEAN DEFAULT false,
    is_fumble BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shared content table (for community-shared characters, campaigns, etc.)
CREATE TABLE IF NOT EXISTS shared_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content_type TEXT NOT NULL, -- 'character', 'campaign', 'npc', etc.
    title TEXT NOT NULL,
    description TEXT,
    content_data JSONB NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE combat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dice_rolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_content ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for characters
CREATE POLICY "Users can view their own characters" ON characters
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own characters" ON characters
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own characters" ON characters
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own characters" ON characters
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for campaigns
CREATE POLICY "GMs can view their own campaigns" ON campaigns
    FOR SELECT USING (auth.uid() = gm_id);

CREATE POLICY "GMs can create their own campaigns" ON campaigns
    FOR INSERT WITH CHECK (auth.uid() = gm_id);

CREATE POLICY "GMs can update their own campaigns" ON campaigns
    FOR UPDATE USING (auth.uid() = gm_id);

CREATE POLICY "GMs can delete their own campaigns" ON campaigns
    FOR DELETE USING (auth.uid() = gm_id);

-- Create policies for combat_sessions
CREATE POLICY "GMs can view their own combat sessions" ON combat_sessions
    FOR SELECT USING (auth.uid() = gm_id);

CREATE POLICY "GMs can create their own combat sessions" ON combat_sessions
    FOR INSERT WITH CHECK (auth.uid() = gm_id);

CREATE POLICY "GMs can update their own combat sessions" ON combat_sessions
    FOR UPDATE USING (auth.uid() = gm_id);

CREATE POLICY "GMs can delete their own combat sessions" ON combat_sessions
    FOR DELETE USING (auth.uid() = gm_id);

-- Create policies for dice_rolls
CREATE POLICY "Users can view their own dice rolls" ON dice_rolls
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own dice rolls" ON dice_rolls
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for shared_content
CREATE POLICY "Users can view public shared content" ON shared_content
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own shared content" ON shared_content
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shared content" ON shared_content
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shared content" ON shared_content
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shared content" ON shared_content
    FOR DELETE USING (auth.uid() = user_id);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_characters_updated_at
    BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_combat_sessions_updated_at
    BEFORE UPDATE ON combat_sessions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shared_content_updated_at
    BEFORE UPDATE ON shared_content
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_characters_user_id ON characters(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_gm_id ON campaigns(gm_id);
CREATE INDEX IF NOT EXISTS idx_combat_sessions_gm_id ON combat_sessions(gm_id);
CREATE INDEX IF NOT EXISTS idx_dice_rolls_user_id ON dice_rolls(user_id);
CREATE INDEX IF NOT EXISTS idx_dice_rolls_character_id ON dice_rolls(character_id);
CREATE INDEX IF NOT EXISTS idx_shared_content_user_id ON shared_content(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_content_public ON shared_content(is_public);
CREATE INDEX IF NOT EXISTS idx_shared_content_type ON shared_content(content_type);
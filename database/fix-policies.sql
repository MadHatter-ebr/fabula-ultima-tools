-- Fix for infinite recursion in user_profiles policies
-- Run this in Supabase SQL Editor to fix the issue

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- Create a safer admin policy that doesn't reference user_profiles within itself
-- This policy allows authenticated users to view their own profile
-- and will be extended with an admin function separately
CREATE POLICY "Users can view profiles safely" ON user_profiles
    FOR SELECT USING (
        auth.uid() = id OR
        auth.jwt() ->> 'role' = 'admin'
    );

-- Alternative: Create admin access through a security definer function instead
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users 
        WHERE id = auth.uid() 
        AND raw_user_meta_data->>'role' = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the admin statistics function to handle the recursion issue
CREATE OR REPLACE FUNCTION get_user_statistics()
RETURNS JSON AS $$
DECLARE
    result JSON;
    is_user_admin BOOLEAN;
BEGIN
    -- Check admin status without causing recursion
    SELECT EXISTS (
        SELECT 1 FROM auth.users 
        WHERE id = auth.uid() 
        AND raw_user_meta_data->>'role' = 'admin'
    ) INTO is_user_admin;
    
    -- Also check if user has admin role in user_profiles (if accessible)
    IF NOT is_user_admin THEN
        BEGIN
            SELECT role = 'admin' INTO is_user_admin
            FROM user_profiles 
            WHERE id = auth.uid();
        EXCEPTION 
            WHEN OTHERS THEN
                is_user_admin := FALSE;
        END;
    END IF;
    
    IF NOT is_user_admin THEN
        RAISE EXCEPTION 'Only admins can access user statistics';
    END IF;
    
    SELECT json_build_object(
        'total_users', (SELECT COUNT(*) FROM auth.users),
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
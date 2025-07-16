import React, { useState, useEffect } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase, authHelpers } from '../lib/supabase';
import './Auth.css';

const Auth = ({ onAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user && onAuthenticated) {
          onAuthenticated(user);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (session?.user && onAuthenticated) {
          onAuthenticated(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [onAuthenticated]);

  const handleSignOut = async () => {
    try {
      await authHelpers.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="auth-user-info">
        <div className="user-avatar">
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="user-details">
          <span className="user-name">
            {user.user_metadata?.full_name || user.email}
          </span>
          <span className="user-email">{user.email}</span>
        </div>
        <button className="sign-out-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>🎮 Welcome to Fabula Ultima Tools</h1>
        <p>Sign in to save your characters, campaigns, and combat sessions</p>
      </div>
      
      <div className="auth-form">
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#667eea',
                  brandAccent: '#764ba2',
                  brandButtonText: 'white',
                  defaultButtonBackground: '#667eea',
                  defaultButtonBackgroundHover: '#764ba2',
                  inputBackground: 'rgba(255, 255, 255, 0.9)',
                  inputBorder: 'rgba(102, 126, 234, 0.3)',
                  inputBorderHover: '#667eea',
                  inputBorderFocus: '#667eea',
                }
              }
            },
            className: {
              container: 'supabase-auth-container',
              button: 'supabase-auth-button',
              input: 'supabase-auth-input',
              label: 'supabase-auth-label',
              message: 'supabase-auth-message',
            }
          }}
          providers={['google', 'github', 'discord']}
          redirectTo={window.location.origin}
          onlyThirdPartyProviders={false}
        />
      </div>
      
      <div className="auth-footer">
        <p>🔒 Your data is securely stored and never shared</p>
        <p>🎭 Create characters • 🎲 Track rolls • ⚔️ Manage combat</p>
      </div>
    </div>
  );
};

export default Auth;
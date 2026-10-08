import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseConfigured, usernameEmail } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(user) {
    if (!user || !supabase) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Profile loading error:', error);
      setProfile(null);
      return;
    }

    setProfile(data || null);
  }

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await loadProfile(data.session?.user);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      await loadProfile(newSession?.user);
      setLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signUp(username, password, details = {}) {
    if (!supabase) throw new Error('Supabase is not configured.');
    const cleanUsername = username.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email: usernameEmail(cleanUsername),
      password
    });
    if (error) throw error;
    if (!data.user) throw new Error('Account could not be created.');
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: cleanUsername,
      ...details
    });
    if (profileError) throw profileError;
    return data;
  }

  async function signIn(username, password) {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: usernameEmail(username),
      password
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, profile, setProfile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

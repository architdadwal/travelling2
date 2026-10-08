import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth({ mode = 'login' }) {
  const [signup, setSignup] = useState(mode === 'signup');
  const [form, setForm] = useState({ username: '', password: '', full_name: '', phone: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { signIn, signUp } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      if (signup) {
        await signUp(form.username, form.password, { full_name: form.full_name, phone: form.phone });
        nav('/profile');
      } else {
        await signIn(form.username, form.password);
        nav('/my-enquiries');
      }
    } catch (err) { setError(err.message || 'Something went wrong.'); }
    finally { setBusy(false); }
  }
  return <div className="auth-page"><div className="auth-card">
    <span className="eyebrow dark">HIMALAYAN TRAILS</span><h1>{signup ? 'Create your travel account' : 'Welcome back'}</h1>
    <p className="muted">{signup ? 'Create an account using only a username and password.' : 'Sign in to manage your travel enquiries.'}</p>
    <form onSubmit={submit} className="form">
      {signup && <><label>Full name<input required value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} placeholder="Your name" /></label><label>Phone number<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91" /></label></>}
      <label>User ID<input required minLength="3" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Choose a username" /></label>
      <label>Password<input required minLength="6" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" /></label>
      {error && <div className="error">{error}</div>}
      <button className="btn btn-primary full" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account' : 'Login'}</button>
    </form>
    <button className="switch" onClick={() => { setSignup(!signup); setError('') }}>{signup ? 'Already have an account? Login' : 'New here? Create an account'}</button>
    <p className="tiny">No Google login. No email required to create your account.</p>
  </div></div>
}

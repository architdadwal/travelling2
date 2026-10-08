import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { profile, setProfile } = useAuth(); const nav = useNavigate();
  const [form, setForm] = useState(profile || {}); const [saved, setSaved] = useState(false);
  useEffect(() => setForm(profile || {}), [profile]);
  async function save(e) {
    e.preventDefault();
    const { data, error } = await supabase.from('profiles').update({
      full_name: form.full_name, phone: form.phone, email: form.email, starting_location: form.starting_location,
      preferred_travel_date: form.preferred_travel_date || null, travellers: Number(form.travellers || 1),
      adults: Number(form.adults || 1), children: Number(form.children || 0), budget: form.budget, preferences: form.preferences
    }).eq('id', profile.id).select().single();
    if (!error) { setProfile(data); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }
  return <div className="section narrow"><span className="eyebrow dark">YOUR PROFILE</span><h1>Tell us about your trip.</h1><p className="muted">These details help us prepare the right transport, stay and itinerary.</p>
    <form className="form profile-form" onSubmit={save}>
      <div className="form-grid"><label>Full name<input value={form.full_name || ''} onChange={e => setForm({ ...form, full_name: e.target.value })} /></label><label>Phone<input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></label><label>Email (optional)<input type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Starting location<input value={form.starting_location || ''} onChange={e => setForm({ ...form, starting_location: e.target.value })} /></label><label>Preferred travel date<input type="date" value={form.preferred_travel_date || ''} onChange={e => setForm({ ...form, preferred_travel_date: e.target.value })} /></label><label>Total travellers<input type="number" min="1" value={form.travellers || 1} onChange={e => setForm({ ...form, travellers: e.target.value })} /></label><label>Adults<input type="number" min="0" value={form.adults || 1} onChange={e => setForm({ ...form, adults: e.target.value })} /></label><label>Children<input type="number" min="0" value={form.children || 0} onChange={e => setForm({ ...form, children: e.target.value })} /></label></div>
      <label>Budget range<select value={form.budget || ''} onChange={e => setForm({ ...form, budget: e.target.value })}><option value="">Select</option><option>Under ₹10,000</option><option>₹10,000 – ₹20,000</option><option>₹20,000 – ₹40,000</option><option>₹40,000+</option><option>Flexible</option></select></label>
      <label>What do you want from this trip?<textarea rows="5" value={form.preferences || ''} onChange={e => setForm({ ...form, preferences: e.target.value })} placeholder="Adventure, temples, village stay, luxury, quiet places, food, etc." /></label>
      {saved && <div className="success">Profile saved.</div>}<button className="btn btn-primary">Save details</button>
    </form><button className="text-btn" onClick={() => nav('/tours')}>Browse tours →</button></div>
}

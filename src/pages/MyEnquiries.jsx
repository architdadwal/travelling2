import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
export default function MyEnquiries() {
    const [items, setItems] = useState([]);
    useEffect(() => { supabase.from('bookings').select('*, packages(name,category,duration)').order('created_at', { ascending: false }).then(({ data }) => setItems(data || [])) }, []);
    return <div className="section narrow"><span className="eyebrow dark">MY TRAVEL</span><h1>My enquiries</h1><p className="muted">We'll contact you after reviewing your request.</p>{!items.length ? <div className="empty"><h3>No enquiries yet</h3><p>Pick a tour and tell us what you need.</p><Link className="btn btn-primary" to="/tours">Explore tours</Link></div> : <div className="enquiry-list">{items.map(x => <div className="enquiry-row" key={x.id}><div><span className="pill">{x.status}</span><h3>{x.packages?.name || 'Custom trip'}</h3><p>{x.travel_date || 'Date flexible'} • {x.travellers} traveller(s)</p></div><span className="muted">{new Date(x.created_at).toLocaleDateString()}</span></div>)}</div>}</div>
}

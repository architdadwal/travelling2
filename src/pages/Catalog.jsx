import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { demoDestinations, demoPackages } from '../lib/data';
import PackageCard from '../components/PackageCard';
import { Link } from 'react-router-dom';

export function Tours({ category }) {
    const [items, setItems] = useState([]);
    useEffect(() => { if (!supabase) { setItems(demoPackages.map((x, i) => ({ id: i + 1, name: x[0], duration: x[1], category: x[2], price_from: Number(x[3].replace(/[₹,]/g, '')), description: 'A curated Himachal experience with practical planning and local assistance.', destination: 'Himachal' })).filter(x => !category || x.category === category)); return } supabase.from('packages').select('*').then(({ data }) => setItems((data || []).filter(x => !category || x.category === category))); }, [category]);
    const title = category === 'Spiritual' ? 'Spiritual journeys' : category || 'Group tours & experiences';
    return <div className="section"><span className="eyebrow dark">{category === 'Spiritual' ? 'SPIRITUAL EXPERIENCES' : 'CURATED EXPERIENCES'}</span><h1>{title}</h1><p className="lead">Choose an experience and send us an enquiry. No payment is required online.</p><div className="card-grid">{items.map(p => <PackageCard key={p.id} pkg={p} />)}</div></div>
}

export function Destinations() {
    const [items, setItems] = useState([]);
    useEffect(() => { if (!supabase) { setItems(demoDestinations.map((x, i) => ({ id: i + 1, name: x[0], slug: x[1], description: x[2], image_url: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80` }))); return } supabase.from('destinations').select('*').order('featured', { ascending: false }).then(({ data }) => setItems(data || [])); }, []);
    return <div className="section"><span className="eyebrow dark">EXPLORE HIMACHAL</span><h1>Where do you want to go?</h1><p className="lead">From famous valleys to remote villages and spiritual circuits.</p><div className="destination-grid">{items.map(d => <Link className="destination-card" to="/tours" key={d.id}><img src={d.image_url} /><div><h3>{d.name}</h3><p>{d.description}</p><span>Plan a trip →</span></div></Link>)}</div></div>
}

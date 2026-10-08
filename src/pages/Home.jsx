import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Hotel, Map, ShieldCheck, Sparkles } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { demoPackages } from '../lib/data';

export default function Home() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    if (!supabase) return setPackages(demoPackages.map((x, i) => ({ id: i + 1, name: x[0], duration: x[1], category: x[2], price_from: Number(x[3].replace(/[₹,]/g, '')), description: 'Curated Himalayan experience with stays, transport and local planning.', destination: 'Himachal' })));
    supabase.from('packages').select('*').eq('featured', true).limit(6).then(({ data }) => setPackages(data || []));
  }, []);
  return <div>
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="eyebrow">HIMACHAL • SPITI • SPIRITUAL JOURNEYS</span>
        <h1>Tell us where you want to go.<br /><em>We'll handle the rest.</em></h1>
        <p>Cars, stays, sightseeing, local experiences and carefully planned mountain journeys — all in one place.</p>
        <div className="hero-actions"><Link className="btn btn-primary" to="/tours">Explore tours <ArrowRight size={18} /></Link><Link className="btn btn-ghost" to="/destinations">Explore destinations</Link></div>
      </div>
    </section>
    <section className="trust-strip"><div><Car /><span><b>Transport</b><small>Cars & local transfers</small></span></div><div><Hotel /><span><b>Stays</b><small>Hotels & homestays</small></span></div><div><Map /><span><b>Sightseeing</b><small>Planned experiences</small></span></div><div><ShieldCheck /><span><b>Personal help</b><small>Real human assistance</small></span></div></section>
    <section className="section">
      <div className="section-head"><div><span className="eyebrow dark">HANDPICKED</span><h2>Popular ways to travel</h2></div><Link to="/tours">See all <ArrowRight size={17} /></Link></div>
      <div className="card-grid">{packages.map(p => <PackageCard key={p.id} pkg={p} />)}</div>
    </section>
    <section className="split-feature"><div className="feature-photo"></div><div className="feature-copy"><span className="eyebrow dark">NOT JUST ANOTHER TOUR</span><h2>Go beyond the usual tourist circuit.</h2><p>Stay in villages. Take the remote road. Meet local hosts. Visit temples. Chase snow and stars. We build the practical details around the experience you actually want.</p><Link className="btn btn-dark" to="/destinations">Find your experience <ArrowRight size={18} /></Link></div></section>
    <section className="cta-section"><Sparkles /><h2>Have a trip in mind?</h2><p>Tell us your dates, group size and what you want to see. We'll call you and work out the details.</p><Link className="btn btn-primary" to="/login">Start a travel enquiry</Link></section>
  </div>
}

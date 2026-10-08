import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, MapPin } from 'lucide-react';

export default function PackageCard({ pkg }) {
  return (
    <article className="package-card">
      <div className="package-image" style={{ backgroundImage: `url(${pkg.image_url || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80'})` }}>
        <span className="pill">{pkg.category}</span>
      </div>
      <div className="package-body">
        <h3>{pkg.name}</h3>
        <p className="muted">{pkg.description}</p>
        <div className="meta-row"><span><Clock3 size={15} />{pkg.duration}</span><span><MapPin size={15} />{pkg.destination}</span></div>
        <div className="card-bottom">
          <div><small>Starting from</small><strong>₹{Number(pkg.price_from || 0).toLocaleString('en-IN')}</strong></div>
          <Link to={`/packages/${pkg.id}`} className="icon-btn">View <ArrowRight size={16} /></Link>
        </div>
      </div>
    </article>
  );
}

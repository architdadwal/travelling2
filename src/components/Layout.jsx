import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Compass, Menu, UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { profile, signOut } = useAuth();

  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Compass size={20} /></span>
          <span>Himalayan<span>Trails</span></span>
        </Link>
        <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/destinations" onClick={() => setOpen(false)}>Destinations</NavLink>
          <NavLink to="/tours" onClick={() => setOpen(false)}>Group Tours</NavLink>
          <NavLink to="/spiritual" onClick={() => setOpen(false)}>Spiritual</NavLink>
          {profile ? (
            <>
              <NavLink to="/my-enquiries" onClick={() => setOpen(false)}>My Enquiries</NavLink>
              {profile.role === 'admin' && <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>}
              <button className="link-button" onClick={signOut}>Logout</button>
            </>
          ) : (
            <Link className="nav-cta" to="/login" onClick={() => setOpen(false)}><UserCircle size={17} /> Login</Link>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-inner">
          <div><div className="brand footer-brand">Himalayan<span>Trails</span></div><p>We plan the journey. You enjoy the mountains.</p></div>
          <div><strong>Travel made simple</strong><p>Cars • Stays • Sightseeing • Experiences</p></div>
        </div>
      </footer>
    </div>
  );
}

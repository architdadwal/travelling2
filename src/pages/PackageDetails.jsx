import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Clock3, MapPin } from 'lucide-react';
import { demoPackages } from '../lib/data';

export default function PackageDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { session, profile } = useAuth();

    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        travel_date: '',
        travellers: 1,
        notes: '',
    });

    useEffect(() => {
        async function loadPackage() {
            setLoading(true);

            // Demo/fallback mode when Supabase isn't configured
            if (!supabase) {
                const selectedPackage = demoPackages[Number(id) - 1];

                if (selectedPackage) {
                    setPkg({
                        id: Number(id),
                        name: selectedPackage[0],
                        duration: selectedPackage[1],
                        category: selectedPackage[2],
                        price_from: Number(
                            selectedPackage[3].replace(/[₹,]/g, '')
                        ),
                        description:
                            'A curated Himalayan experience with transport, stay and sightseeing planning.',
                        destination: 'Himachal',
                        itinerary: [
                            'Arrival & transfer',
                            'Sightseeing and local experiences',
                            'Free time',
                            'Departure',
                        ],
                        inclusions: [
                            'Stay',
                            'Transport',
                            'Trip coordination',
                        ],
                        exclusions: [
                            'Personal expenses',
                        ],
                    });
                }

                setLoading(false);
                return;
            }

            const { data, error: packageError } = await supabase
                .from('packages')
                .select('*')
                .eq('id', id)
                .single();

            if (packageError) {
                console.error(packageError);
                setPkg(null);
            } else {
                setPkg(data);
            }

            setLoading(false);
        }

        loadPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="center-page">
                <div className="spinner" />
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="center-page">
                <h2>Package not found</h2>
            </div>
        );
    }

    async function enquire(e) {
        e.preventDefault();

        setError('');
        setMsg('');

        // User isn't logged in
        if (!session) {
            navigate('/login');
            return;
        }

        const { error: bookingError } = await supabase
            .from('bookings')
            .insert({
                user_id: session.user.id,
                package_id: pkg.id,
                travel_date: form.travel_date || null,
                travellers: Number(form.travellers),
                notes: form.notes,
            });

        if (bookingError) {
            console.error(bookingError);
            setError(
                bookingError.message ||
                'Unable to submit your enquiry.'
            );
            return;
        }

        setMsg(
            'Enquiry submitted successfully. Our team will contact you to finalize the trip.'
        );

        setForm({
            travel_date: '',
            travellers: 1,
            notes: '',
        });
    }

    return (
        <div>
            {/* Package Hero */}
            <div
                className="detail-hero"
                style={{
                    backgroundImage: `url(${pkg.image_url ||
                        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80'
                        })`,
                }}
            >
                <div>
                    <span className="pill">
                        {pkg.category}
                    </span>

                    <h1>{pkg.name}</h1>

                    <p>{pkg.description}</p>
                </div>
            </div>

            {/* Main Package Content */}
            <div className="detail-layout">

                {/* Left Content */}
                <div>

                    {/* Package Meta */}
                    <div className="detail-meta">
                        <span>
                            <Clock3 size={18} />
                            {pkg.duration}
                        </span>

                        <span>
                            <MapPin size={18} />
                            {pkg.destination}
                        </span>
                    </div>

                    {/* Itinerary */}
                    <section className="content-block">
                        <h2>Itinerary</h2>

                        {(pkg.itinerary || []).map((item, index) => (
                            <div
                                className="timeline"
                                key={index}
                            >
                                <b>
                                    Day {index + 1}
                                </b>

                                <span>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </section>

                    {/* Included / Excluded */}
                    <section className="content-cols">

                        <div>
                            <h3>Included</h3>

                            {(pkg.inclusions || []).map(
                                (item, index) => (
                                    <p key={index}>
                                        <CheckCircle2 size={17} />
                                        {item}
                                    </p>
                                )
                            )}
                        </div>

                        <div>
                            <h3>Not included</h3>

                            {(pkg.exclusions || []).map(
                                (item, index) => (
                                    <p key={index}>
                                        • {item}
                                    </p>
                                )
                            )}
                        </div>

                    </section>
                </div>

                {/* Booking / Enquiry Card */}
                <aside className="enquiry-card">

                    <small>
                        Starting from
                    </small>

                    <div className="price">
                        ₹
                        {Number(
                            pkg.price_from || 0
                        ).toLocaleString('en-IN')}
                    </div>

                    <p>
                        No online payment required.
                        Submit an enquiry and our team
                        will contact you.
                    </p>

                    <form
                        className="form"
                        onSubmit={enquire}
                    >

                        <label>
                            Travel date

                            <input
                                type="date"
                                value={form.travel_date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        travel_date: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <label>
                            Travellers

                            <input
                                type="number"
                                min="1"
                                value={form.travellers}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        travellers: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <label>
                            Anything else?

                            <textarea
                                rows="4"
                                value={form.notes}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        notes: e.target.value,
                                    })
                                }
                                placeholder="Pickup, room preference, special request..."
                            />
                        </label>

                        {error && (
                            <div className="error">
                                {error}
                            </div>
                        )}

                        {msg && (
                            <div className="success">
                                {msg}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary full"
                        >
                            {profile
                                ? 'Send enquiry'
                                : 'Login to enquire'}
                        </button>

                    </form>
                </aside>
            </div>
        </div>
    );
}
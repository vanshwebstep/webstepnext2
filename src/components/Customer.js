"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiBriefcase, FiStar, FiCheckCircle, FiGlobe } from 'react-icons/fi';

const reviews = [
  {
    id: 0, initials: 'BB',
    name: 'Bradley Braun', role: 'Verified Client',
    content: "I enjoy working with Karan from Webstep Solutions, he is fluent in English and has excellent developmental skills.",
    tag: 'WordPress & Dev', accent: '#7C3AED', accentLight: '#ede9fe', accentText: '#5b21b6',
    avatarFrom: '#7C3AED', avatarTo: '#a855f7', barFrom: '#7C3AED', barTo: '#a855f7',
  },
 
  {
    id: 1, initials: 'MS',
    name: 'Magnus Stihl', role: 'Business Owner',
    content: "Karan from Webstep Solutions saved the day for us! What began as some final finishes before launching to include membership account registration pages set up, adding icons and linking our social media accounts with the site, and some testing developed into a significant list of issues that Karan was able to discover and provide a various array of fixes including writing additional code, installing the appropriate plugins and a vast amount of troubleshooting and testing. Karan possesses an immense level of skills, when he says he will work, he does. When he says he will be finished, he meets the deadline. When he knows issues are critical, he stays the course until the issues are resolved. Like other business owners, we obviously have high expectations when hiring staff and engaging contractors. Karan exceeded our expectations. 10 stars!",
    tag: 'Membership & Custom Dev', accent: '#059669', accentLight: '#d1fae5', accentText: '#065f46',
    avatarFrom: '#059669', avatarTo: '#34d399', barFrom: '#059669', barTo: '#34d399',
  },
  {
    id: 2, initials: 'ST',
    name: 'Syga Thomas', role: 'Verified Client',
    content: "Karan was excellent. He went above and beyond and can perform any task when it comes to website design.",
    tag: 'Website Design', accent: '#0891B2', accentLight: '#e0f2fe', accentText: '#0369a1',
    avatarFrom: '#0891B2', avatarTo: '#38bdf8', barFrom: '#0891B2', barTo: '#38bdf8',
  },
  {
    id: 3, initials: 'NM',
    name: 'Nathanael Murphy', role: 'Frontend Client',
    content: "Karan did an excellent job in a timely manner. He added his own design concepts without being asked, which helped make the project even better. I highly recommend Karan and am already hiring him for a second frontend project.",
    tag: 'UI/UX & Frontend', accent: '#DB2777', accentLight: '#fce7f3', accentText: '#9d174d',
    avatarFrom: '#DB2777', avatarTo: '#f472b6', barFrom: '#DB2777', barTo: '#f472b6',
  },
  {
    id: 4, initials: 'BT',
    name: 'Ben Tee', role: 'Verified Client',
    content: "Wonderful work done!",
    tag: 'Web Solutions', accent: '#7C3AED', accentLight: '#ede9fe', accentText: '#5b21b6',
    avatarFrom: '#7C3AED', avatarTo: '#a855f7', barFrom: '#7C3AED', barTo: '#a855f7',
  },
  {
    id: 5, initials: 'AD',
    name: 'Amir Dagan', role: 'Verified Client',
    content: "The freelancer was very professional, well prepared and had a lot of patience with us",
    tag: 'Web Development', accent: '#EA580C', accentLight: '#ffedd5', accentText: '#9a3412',
    avatarFrom: '#EA580C', avatarTo: '#fb923c', barFrom: '#EA580C', barTo: '#fb923c',
  },
];

const stats = [
  { icon: <FiBriefcase />, num: '120+', label: 'Projects Delivered', bg: '#ede9fe', color: '#7C3AED' },
  { icon: <FiStar />, num: '4.9/5', label: 'Avg Client Rating', bg: '#e0f2fe', color: '#0891B2' },
  { icon: <FiCheckCircle />, num: '98%', label: 'Client Satisfaction', bg: '#d1fae5', color: '#059669' },
  { icon: <FiGlobe />, num: '15+', label: 'Countries Served', bg: '#ffedd5', color: '#EA580C' },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const Customer = () => {
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);
  const total = reviews.length;
  const width = useWindowWidth();
  const isMobile = width < 640;

  const goTo = (i) => setCur((i + total) % total);
  const next = () => goTo(cur + 1);
  const prev = () => goTo(cur - 1);
  const startAuto = () => { timerRef.current = setInterval(() => setCur(c => (c + 1) % total), 4000); };
  const stopAuto = () => clearInterval(timerRef.current);
  useEffect(() => { startAuto(); return stopAuto; }, []);

  const r = reviews[cur];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        .customer-section * { font-family: 'Roboto', sans-serif; box-sizing: border-box; }
        .tnavbtn:hover { background: #7C3AED !important; color: #fff !important; border-color: #7C3AED !important; }
        .tdot-pill { transition: all 0.25s; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .ping-dot { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>

      <section className="customer-section" style={{ background: '#f4f3fa', padding: isMobile ? '2.5rem 0.8rem' : '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '1.5rem' : '2.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '16px',
              background: '#fff', border: '1px solid rgba(255,255,255,0.6)',
              color: '#FF1F8E', fontWeight: 700, fontSize: isMobile ? '9px' : '10px',
              letterSpacing: isMobile ? '0.18em' : '0.3em', textTransform: 'uppercase',
              marginBottom: '1rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span className="ping-dot" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#FF1F8E', opacity: 0.75 }} />
                <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#FF1F8E', display: 'inline-block' }} />
              </span>
              Client Stories
            </div>
            <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#18142e', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
              What Our Clients{' '}
              <span style={{
                background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Say</span>
            </h2>
            <p style={{ fontSize: isMobile ? '13px' : '18px', color: '#8b87a8', marginTop: '0.5rem', fontWeight: 500 }}>
              Real feedback from startups, businesses, and enterprises we've built for.
            </p>
          </div>

          {/* Slider */}
          <div style={{ borderRadius: '20px', border: '1.5px solid #eceaf5', background: '#f4f3fa', overflow: 'hidden' }}
            onMouseEnter={stopAuto} onMouseLeave={startAuto}>
            <div style={{
              padding: isMobile ? '1.2rem 1rem 1.2rem 1.4rem' : '1.8rem',
              background: `linear-gradient(180deg, #ede9fe, #FFF)`,
              position: 'relative', transition: 'background 0.3s',
            }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(180deg, ${r.barFrom}, ${r.barTo})`, borderRadius: '4px 0 0 4px' }} />

              {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, color: '#fff', background: `linear-gradient(135deg, ${r.avatarFrom}, ${r.avatarTo})` }}>
                        {r.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#18142e', lineHeight: 1.2 }}>{r.name}</div>
                        <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b87a8', marginTop: '1px' }}>{r.role}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2.5px 8px', borderRadius: '100px', background: r.accentLight, color: r.accentText, flexShrink: 0 }}>{r.tag}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                    {[...Array(5)].map((_, i) => <FaStar key={i} size={11} color={r.accent} />)}
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#3d3660', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic', margin: '2px 0 0 0' }}>"{r.content}"</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', alignItems: 'center', gap: '1.4rem' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 900, color: '#fff', flexShrink: 0, background: `linear-gradient(135deg, ${r.avatarFrom}, ${r.avatarTo})` }}>
                    {r.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: '#3d3660', lineHeight: 1.65, fontWeight: 500, fontStyle: 'italic', marginBottom: '8px' }}>"{r.content}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#18142e' }}>{r.name}</span>
                      <span style={{ fontSize: '11px', color: '#c4c0d8' }}>·</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#8b87a8' }}>{r.role}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <FaStar key={i} size={12} color={r.accent} />)}</div>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px', background: r.accentLight, color: r.accentText }}>{r.tag}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0.6rem 0.8rem' : '0.85rem 1.4rem', borderTop: '1.5px solid #eceaf5', background: '#fff' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className="tdot-pill"
                    style={{ width: i === cur ? '22px' : '7px', height: '7px', borderRadius: i === cur ? '4px' : '50%', background: i === cur ? '#7C3AED' : '#e0ddf5', border: 'none', cursor: 'pointer', padding: 0 }} />
                ))}
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8b87a8', letterSpacing: '0.1em' }}>
                {String(cur + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[{ fn: prev, icon: <FiArrowLeft size={15} /> }, { fn: next, icon: <FiArrowRight size={15} /> }].map((btn, i) => (
                  <button key={i} className="tnavbtn" onClick={btn.fn}
                    style={{ width: isMobile ? 30 : 34, height: isMobile ? 30 : 34, borderRadius: '10px', border: '1.5px solid #e0ddf5', background: '#fff', color: '#7C3AED', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            marginTop: '1rem', background: '#fff', border: '1.5px solid #eceaf5', borderRadius: '20px',
            padding: isMobile ? '0.8rem 0.6rem' : '1.2rem 1.6rem',
            display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: isMobile ? '0.6rem 0.4rem' : '0',
                borderRight: isMobile ? (i % 2 === 0 ? '1px solid #eceaf5' : 'none') : (i < stats.length - 1 ? '1px solid #eceaf5' : 'none'),
                borderBottom: isMobile ? (i < 2 ? '1px solid #eceaf5' : 'none') : 'none',
                justifyContent: isMobile ? 'center' : 'flex-start',
                paddingLeft: isMobile ? undefined : (i === 0 ? 0 : '1.6rem'),
                paddingRight: isMobile ? undefined : (i < stats.length - 1 ? '1.6rem' : 0),
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', background: s.bg, color: s.color, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 900, color: '#18142e', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '8.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b87a8', marginTop: '2px' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Customer;
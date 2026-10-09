"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FiTarget, FiUsers, FiCode, FiShield } from 'react-icons/fi';
import Link from "next/link";
import { assetImage } from "@/lib/assets";
const dev = assetImage("development-company.png");

const stats = [
  { num: '120+', label: 'Projects Delivered', icon: <FiTarget />, color: '#7C3AED', shadow: 'rgba(124,58,237,0.12)', border: '#ede9fe' },
  { num: '98%', label: 'On-Time Delivery', icon: <FiUsers />, color: '#0891B2', shadow: 'rgba(8,145,178,0.12)', border: '#e0f2fe' },
  { num: '12+', label: 'Technologies', icon: <FiCode />, color: '#059669', shadow: 'rgba(16,185,129,0.12)', border: '#d1fae5' },
  { num: '24/7', label: 'Client Support', icon: <FiShield />, color: '#EA580C', shadow: 'rgba(234,88,12,0.12)', border: '#ffedd5' },
];

const reviews = [

  {
    name: 'Bradley Braun', role: 'Verified Client',
    text: 'Webstep Solutions provided the deliverables in a timely and professional manner. They knows WordPress (as qwell as other platforms) and exceeded expectations.',
    avatarBg: 'rgba(99,102,241,0.1)', avatarColor: '#6366F1',
  },
  {
    name: 'Magnus Stihl', role: 'Business Owner',
    text: "Karan from Webstep Solutions saved the day for us! What began as some final finishes before launching to include membership account registration pages set up, adding icons and linking our social media accounts with the site, and some testing developed into a significant list of issues that Karan was able to discover and provide a various array of fixes including writing additional code, installing the appropriate plugins and a vast amount of troubleshooting and testing. Karan possesses an immense level of skills, when he says he will work, he does. When he says he will be finished, he meets the deadline. When he knows issues are critical, he stays the course until the issues are resolved. Like other business owners, we obviously have high expectations when hiring staff and engaging contractors. Karan exceeded our expectations. 10 stars!",
    avatarBg: 'rgba(8,145,178,0.1)', avatarColor: '#0891B2',
  },
  {
    name: 'Syga Thomas', role: 'Verified Client',
    text: 'Karan was excellent. He went above and beyond and can perform any task when it comes to website design.',
    avatarBg: 'rgba(5,150,105,0.1)', avatarColor: '#059669',
  },
  {
    name: 'Nathanael Murphy', role: 'Frontend Client',
    text: 'Karan did an excellent job in a timely manner. He added his own design concepts without being asked, which helped make the project even better. I highly recommend Karan and am already hiring him for a second frontend project.',
    avatarBg: 'rgba(219,39,119,0.1)', avatarColor: '#DB2777',
  },
  {
    name: 'Ben Tee', role: 'Verified Client',
    text: 'Wonderful work done!',
    avatarBg: 'rgba(124,58,237,0.1)', avatarColor: '#7C3AED',
  },
  {
    name: 'Amir Dagan', role: 'Verified Client',
    text: 'The freelancer was very professional, well prepared and had a lot of patience with us',
    avatarBg: 'rgba(234,88,12,0.1)', avatarColor: '#EA580C',
  },
];

const trustAvatars = [
  { letter: 'A', bg: '#7C3AED' },
  { letter: 'B', bg: '#0891B2' },
  { letter: 'C', bg: '#059669' },
  { letter: '+', bg: '#EA580C' },
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

const Experience = () => {
  const sectionRef = useRef(null);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('ex-visible'); observer.unobserve(entry.target); } }); },
      { threshold: 0.12 }
    );
    const targets = sectionRef.current?.querySelectorAll('.ex-fade');
    targets?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .ex-section * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .ex-ping { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
        .ex-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .ex-fade.ex-visible { opacity: 1; transform: translateY(0); }
        .ex-img-card { background: #fff; border: 1.5px solid #f0f0f4; border-radius: 28px; padding: 28px; box-shadow: 0 8px 50px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.04); transition: box-shadow 0.4s ease, transform 0.4s ease; }
        .ex-img-card:hover { box-shadow: 0 20px 80px rgba(124,58,237,0.13), 0 4px 16px rgba(0,0,0,0.06); transform: translateY(-5px); }
        .ex-review-row { display: flex; gap: 12px; padding: 14px; background: #fafafa; border: 1px solid #f0f0f4; border-radius: 16px; transition: border-color 0.3s, background 0.3s; }
        .ex-review-row:hover { border-color: rgba(124,58,237,0.22); background: #f5f3ff; }
        .ex-stat-card { position: relative; padding: 20px; background: #fff; border-radius: 22px; border-width: 1.5px; border-style: solid; overflow: hidden; cursor: default; transition: box-shadow 0.35s, transform 0.35s; }
        .ex-stat-card:hover { transform: translateY(-3px); }
        .ex-stat-bar { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; border-radius: 0 0 22px 22px; transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
        .ex-stat-card:hover .ex-stat-bar { transform: scaleX(1); }
        .ex-stat-icon { font-size: 22px; margin-bottom: 10px; transition: transform 0.35s; }
        .ex-stat-card:hover .ex-stat-icon { transform: scale(1.18); }
        .ex-stat-num { font-size: 2rem; font-weight: 900; color: #0a0a0a; letter-spacing: -0.04em; line-height: 1; margin-bottom: 4px; transition: color 0.3s; }
        .ex-stat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #94a3b8; }
        .ex-btn-primary { display: inline-block; padding: 13px 26px; background: #0a0a0a; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; transition: background 0.3s, box-shadow 0.3s, transform 0.2s; text-align: center; }
        .ex-btn-primary:hover { background: #7C3AED; box-shadow: 0 10px 32px rgba(124,58,237,0.3); transform: translateY(-1px); }
        .ex-btn-secondary { display: inline-block; padding: 13px 22px; background: transparent; color: #64748b; font-size: 10px; font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase; border-radius: 12px; border: 1.5px solid #e2e8f0; cursor: pointer; text-decoration: none; transition: border-color 0.3s, color 0.3s, transform 0.2s; text-align: center; }
        .ex-btn-secondary:hover { border-color: rgba(124,58,237,0.45); color: #7C3AED; transform: translateY(-1px); }
        @media (max-width: 639px) { .ex-stat-num { font-size: 1.5rem; } .ex-img-card { padding: 16px; border-radius: 18px; } .ex-stat-card { padding: 14px; } }
      `}</style>

      <section ref={sectionRef} className="ex-section" style={{ background: '#fff', position: 'relative', overflow: 'hidden', padding: isMobile ? '36px 14px' : isTablet ? '64px 24px' : '80px 28px' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 450, height: 450, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(6,182,212,0.05)', filter: 'blur(70px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="ex-fade" style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '16px', background: '#fff', border: '1px solid rgba(255,255,255,0.6)', color: '#FF1F8E', fontWeight: 700, fontSize: isMobile ? '9px' : '10px', letterSpacing: isMobile ? '0.18em' : '0.3em', textTransform: 'uppercase', marginBottom: '1rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span className="ex-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#FF1F8E', opacity: 0.75 }} />
                <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#FF1F8E', display: 'inline-block' }} />
              </span>
              Why Webstep
            </div>
            <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 10 }}>
              Built on{' '}
              <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Trust & Results
              </span>
            </h2>
            <p style={{ fontSize: isMobile ? 13 : 18, color: '#94a3b8', fontWeight: 500, lineHeight: 1.65, maxWidth: 440, margin: '0 auto', padding: '0 8px' }}>
              We don&apos;t just ship code — we become an extension of your team and deliver products that actually move the needle.
            </p>
          </div>

          {/* Two-col layout */}
          <div style={{ display: 'grid', gridTemplateColumns: width >= 768 ? 'minmax(0,1fr) minmax(0,1fr)' : '1fr', gap: isMobile ? 20 : 28, alignItems: 'start' }}>

            {/* LEFT */}
            <div className="ex-img-card ex-fade" style={{ transitionDelay: '0.1s' }}>
              <Image src={dev} alt="Webstep Solutions Development" style={{ width: '100%', height: 'auto', borderRadius: 18, marginBottom: 18, display: 'block' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
                    {[1, 2, 3, 4, 5].map(s => <FaStar key={s} style={{ color: '#F59E0B', fontSize: 14 }} />)}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0a0a0a' }}>5.0 · 120+ reviews</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#cbd5e1' }}>Verified</div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#10B981', marginTop: 1 }}>Google Reviews</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                {reviews.map((r, i) => (
                  <div key={i} className="ex-review-row">
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: r.avatarBg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: r.avatarColor }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.5, fontWeight: 500, marginBottom: 3 }}>"{r.text}"</p>
                      <p style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{r.name} · {r.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="ex-fade" style={{ transitionDelay: '0.2s' }}>
              <p style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#93989e', marginBottom: 8 }}>Why Clients Choose Webstep</p>
              <h3 style={{ fontSize: isMobile ? '1.4rem' : 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
                Numbers that{' '}
                <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>speak for themselves</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? 8 : 12, marginBottom: 22 }}>
                {stats.map((item, idx) => (
                  <div key={idx} className="ex-stat-card" style={{ borderColor: item.border }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 36px ${item.shadow}`; e.currentTarget.querySelector('.ex-stat-num').style.color = item.color; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.querySelector('.ex-stat-num').style.color = '#0a0a0a'; }}>
                    <div className="ex-stat-bar" style={{ background: item.color }} />
                    <div className="ex-stat-icon" style={{ color: item.color }}>{item.icon}</div>
                    <div className="ex-stat-num">{item.num}</div>
                    <div className="ex-stat-label">{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 1, background: '#f0f0f4' }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#cbd5e1', whiteSpace: 'nowrap' }}>Trusted Worldwide</span>
                <div style={{ flex: 1, height: 1, background: '#f0f0f4' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 10 }}>
                <Link href="/case-study" className="ex-btn-primary" style={{ width: isMobile ? '100%' : 'auto' }}>See Our Work</Link>
                <Link href="/customize-package" className="ex-btn-secondary" style={{ width: isMobile ? '100%' : 'auto' }}>Start a Project →</Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, padding: isMobile ? '10px 12px' : '14px 18px', background: '#fafafa', border: '1px solid #f0f0f4', borderRadius: 14 }}>
                <div style={{ display: 'flex', flexShrink: 0 }}>
                  {trustAvatars.map((av, i) => (
                    <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: av.bg, border: '2px solid #fff', marginLeft: i === 0 ? 0 : -6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#fff', zIndex: trustAvatars.length - i, position: 'relative' }}>
                      {av.letter}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: isMobile ? 10 : 11, fontWeight: 600, color: '#64748b', margin: 0 }}>
                  <span style={{ color: '#7C3AED', fontWeight: 800 }}>120+ projects</span> delivered across 15+ countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
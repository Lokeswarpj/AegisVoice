import React from 'react';
import { Zap, Shield, Key, ExternalLink } from 'lucide-react';

export default function NeoNavbar({ onOpenSettings, status }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        height: '80px',
        backgroundColor: 'var(--yellow)',
        borderBottom: '2px solid var(--black)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}
    >
      {/* Left: Logo with a 10x10 black square icon containing a #ffe17c bolt */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--black)',
            boxShadow: '3px 3px 0px 0px var(--black)'
          }}
        >
          <Zap size={22} color="var(--yellow)" fill="var(--yellow)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--black)',
              lineHeight: 1
            }}
          >
            AEGIS<span style={{ color: 'var(--charcoal)' }}>VOICE</span>
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)' }}>
            ArmorIQ Governance + ElevenLabs
          </span>
        </div>
      </div>

      {/* Center: Horizontal links in bold Satoshi */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {[
          { label: 'Problem vs Solution', href: '#problem' },
          { label: 'Features', href: '#features' },
          { label: 'How It Works', href: '#how-it-works' },
          { label: 'Personas', href: '#personas' },
          { label: 'Testimonials', href: '#testimonials' }
        ].map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            style={{
              textDecoration: 'none',
              color: 'var(--black)',
              fontWeight: 700,
              fontSize: '0.92rem',
              transition: 'opacity 0.15s ease'
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: 'Start Free Trial' button (Black background, white text, 2px border, hard shadow) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Status chip */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '2px solid var(--black)',
            padding: '6px 12px',
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '2px 2px 0px 0px var(--black)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
          <span>ArmorIQ: {status?.isLiveConfigured ? 'Live' : 'Ready'}</span>
        </div>

        <button
          onClick={onOpenSettings}
          title="Configure API Keys"
          style={{
            backgroundColor: 'var(--sage)',
            border: '2px solid var(--black)',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '3px 3px 0px 0px var(--black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Key size={16} color="var(--black)" />
        </button>

        <a
          href="#interactive-demo"
          className="btn-neo-primary"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem', textDecoration: 'none' }}
        >
          Start Free Trial
        </a>
      </div>
    </header>
  );
}

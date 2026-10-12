import React from 'react';

const BRANDS = [
  'ACME CORP',
  'GLOBEX INDUSTRIES',
  'INITECH SYSTEMS',
  'UMBRELLA SECURITY',
  'HOOLI AI',
  'MASSIVE DYNAMIC',
  'WAYNE ENTERPRISES',
  'CYBERDYNE RESILIENCE',
  'SOYLENT CLOUD'
];

export default function SocialProofMarquee() {
  return (
    <section
      style={{
        backgroundColor: 'var(--charcoal)',
        borderBottom: '2px solid var(--black)',
        padding: '1.25rem 0',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div className="marquee-track">
        {/* Repeating twice for smooth continuous infinite loop */}
        {[...BRANDS, ...BRANDS].map((brand, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              padding: '0 1.5rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--sage)',
                opacity: 0.5,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap'
              }}
            >
              {brand}
            </span>
            <span style={{ color: 'var(--sage)', opacity: 0.3, fontSize: '1rem' }}>✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}

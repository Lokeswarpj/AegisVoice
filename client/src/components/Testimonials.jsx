import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "ArmorIQ gave us the confidence to put autonomous voice agents directly in front of 4,000 corporate employees. When red-teamers tried social engineering for root access, it was blocked cold.",
    author: "Elena Rostova",
    role: "Head of Infrastructure Security",
    company: "Globex Financial"
  },
  {
    quote: "The combination of ElevenLabs natural speech with ArmorIQ cryptographic intent tokens feels like magic. Fast, conversational, and genuinely airtight security boundaries.",
    author: "Marcus Vance",
    role: "Principal AI Engineer",
    company: "Massive Dynamic"
  },
  {
    quote: "Integrating our IT helpdesk MCP server took less than an hour. The fact that every Allowed and Blocked verdict is verifiable on platform.armoriq.ai satisfies all our SOC2 criteria.",
    author: "Sarah Jenkins",
    role: "Director of Enterprise IT",
    company: "Initech Cloud"
  }
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: 'var(--sage)',
        padding: '5.5rem 2rem',
        borderBottom: '2px solid var(--black)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              backgroundColor: 'var(--white)',
              border: '2px solid var(--black)',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              boxShadow: '3px 3px 0px 0px var(--black)',
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            VALIDATED IN PRODUCTION
          </span>
          <h2 style={{ fontSize: '3rem', color: 'var(--black)' }}>
            What Security Engineers Are Saying
          </h2>
        </div>

        {/* Grid of 3 White Cards with Asymmetric Corner Rounding */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="card-asymmetric"
              style={{
                backgroundColor: 'var(--white)',
                border: '2px solid var(--black)',
                boxShadow: '6px 6px 0px 0px var(--black)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '9px 9px 0px 0px var(--black)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px 0px var(--black)';
              }}
            >
              <div>
                {/* 5-Star Rating in #ffbc2e yellow */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={18} fill="var(--star-yellow)" color="var(--star-yellow)" />
                  ))}
                </div>

                <p style={{ color: 'var(--charcoal)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic', marginBottom: '2rem' }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '2px solid var(--black)', paddingTop: '1.25rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--black)' }}>
                  {t.author}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#4b5563', fontWeight: 600 }}>
                  {t.role} • <strong>{t.company}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

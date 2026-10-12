import React from 'react';
import { Mic, FileCheck2, ShieldAlert } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Voice Request & Plan Capture',
    description: 'The employee speaks to the agent via ElevenLabs voice. The agent constructs a canonical execution plan detailing required tools.',
    borderColor: 'var(--sage)',
    colorName: 'Sage',
    icon: Mic
  },
  {
    number: '02',
    title: 'Cryptographic Token Minting',
    description: 'ArmorIQ canonicalizes the plan, computes the SHA-256 hash, and issues an Ed25519-signed Intent Token bound to user scope.',
    borderColor: 'var(--yellow)',
    colorName: 'Yellow',
    icon: FileCheck2
  },
  {
    number: '03',
    title: 'Runtime Policy Sentry Check',
    description: 'Every tool invocation is intercepted before reaching the MCP server. Allowed actions execute; privilege escalations are blocked (403).',
    borderColor: 'var(--white)',
    colorName: 'White',
    icon: ShieldAlert
  }
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: 'var(--charcoal)',
        color: 'var(--white)',
        padding: '5.5rem 2rem',
        borderBottom: '2px solid var(--black)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span
            style={{
              backgroundColor: 'var(--yellow)',
              color: 'var(--black)',
              border: '2px solid var(--black)',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              boxShadow: '3px 3px 0px 0px var(--white)',
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            ARCHITECTURE IN MOTION
          </span>
          <h2 style={{ fontSize: '3rem', color: 'var(--white)' }}>
            How Intent Verification Works at Runtime
          </h2>
        </div>

        {/* 3-Step Horizontal Flow with Connecting Dark Gray #272727 Line */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Dark Gray #272727 Connecting Horizontal Line (desktop) */}
          <div
            style={{
              position: 'absolute',
              top: '46px',
              left: '12%',
              right: '12%',
              height: '4px',
              backgroundColor: 'var(--gray-dark)',
              zIndex: 1
            }}
          ></div>

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* Large 24x24 (80px) circle with 4px colored border */}
                <div
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--charcoal)',
                    border: `4px solid ${step.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    marginBottom: '1.5rem',
                    color: step.borderColor
                  }}
                >
                  <Icon size={36} />
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--gray-dark)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    padding: '2px 10px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: step.borderColor,
                    fontWeight: 700,
                    marginBottom: '0.75rem'
                  }}
                >
                  STEP {step.number}
                </div>

                <h3
                  style={{
                    fontSize: '1.4rem',
                    marginBottom: '0.75rem',
                    color: 'var(--white)'
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    color: 'var(--sage)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    maxWidth: '320px'
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

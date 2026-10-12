import React from 'react';
import { X, Check } from 'lucide-react';

export default function ProblemVsSolution() {
  return (
    <section
      id="problem"
      style={{
        backgroundColor: 'var(--white)',
        padding: '5rem 2rem',
        borderBottom: '2px solid var(--black)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              backgroundColor: 'var(--sage)',
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
            THE SECURITY CONUNDRUM
          </span>
          <h2 style={{ fontSize: '3rem', color: 'var(--black)', maxWidth: '750px', margin: '0 auto' }}>
            Traditional IAM Was Built For Humans, Not Autonomous AI Agents
          </h2>
        </div>

        {/* Two Large 3xl-rounded Cards Side-by-Side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          
          {/* Card A (Problem): #f4f4f5, 2px dashed gray border, 70% opacity, 3xl-rounded */}
          <div
            style={{
              backgroundColor: '#f4f4f5',
              border: '2px dashed #9ca3af',
              borderRadius: '1.5rem', /* 3xl */
              opacity: 0.75,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#fee2e2',
                  border: '2px solid #ef4444',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <X size={24} color="#dc2626" />
              </div>

              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--charcoal)' }}>
                Without ArmorIQ (The Vulnerable State)
              </h3>
              <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Agents have static credentials to call tools. If tricked via prompt injection or urgency coercions, they abuse their authority.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  'Blanket IAM roles let jailbroken agents execute unauthorized admin tools.',
                  'Zero cryptographic binding between user prompt and executed tool arguments.',
                  'Privilege escalation attacks slip past traditional perimeter firewalls.',
                  'Silent data exfiltration and credential manipulation with zero intent verification.'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ backgroundColor: '#fee2e2', borderRadius: '4px', padding: '2px', marginTop: '2px' }}>
                      <X size={15} color="#ef4444" />
                    </div>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#374151' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed #cbd5e1', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
              RESULT: HIGH RISK OF COMPROMISE & AUDIT NON-COMPLIANCE
            </div>
          </div>

          {/* Card B (Solution): #ffe17c, 2px solid black border, 8px hard shadow, 3xl-rounded */}
          <div
            style={{
              backgroundColor: 'var(--yellow)',
              border: '2px solid var(--black)',
              borderRadius: '1.5rem', /* 3xl */
              boxShadow: '8px 8px 0px 0px var(--black)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'var(--black)',
                  border: '2px solid var(--black)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '3px 3px 0px 0px var(--black)'
                }}
              >
                <Check size={24} color="var(--yellow)" />
              </div>

              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--black)' }}>
                With ArmorIQ Intent Governance
              </h3>
              <p style={{ color: 'var(--charcoal)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 500 }}>
                Every action is cryptographically signed and checked against enterprise policies before reaching MCP endpoints.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  'Cryptographic Ed25519 Intent Tokens bound strictly to authorized plans.',
                  'Deterministic runtime policy sentry blocks privilege escalation (403).',
                  'Permits approved self-service actions (e.g. password resets) safely.',
                  'Tamper-evident audit trail streamed directly to platform.armoriq.ai.'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ backgroundColor: 'var(--black)', borderRadius: '4px', padding: '2px', marginTop: '2px' }}>
                      <Check size={15} color="var(--yellow)" />
                    </div>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--black)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '2px solid var(--black)', fontSize: '0.8rem', color: 'var(--black)', fontWeight: 800 }}>
              RESULT: ZERO-TRUST AUTONOMOUS REASONING WITH ZERO LATENCY OVERHEAD
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

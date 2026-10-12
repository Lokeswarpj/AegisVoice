import React from 'react';
import { Headphones, ShieldAlert, Cpu } from 'lucide-react';

export default function UseCasePersonas() {
  return (
    <section
      id="personas"
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
            USE CASE PERSONAS
          </span>
          <h2 style={{ fontSize: '3rem', color: 'var(--black)' }}>
            Tailored For Modern Enterprise Teams
          </h2>
        </div>

        {/* 3-Column Bento Grid: Sage, Yellow (8px shadow), Dark Gray */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Card 1: Sage (#b7c6c2) */}
          <div
            style={{
              backgroundColor: 'var(--sage)',
              border: '2px solid var(--black)',
              borderRadius: '1rem',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '4px 4px 0px 0px var(--black)'
            }}
          >
            <div>
              {/* White 'pill' badge at top */}
              <div
                style={{
                  backgroundColor: 'var(--white)',
                  border: '2px solid var(--black)',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1.5rem',
                  boxShadow: '2px 2px 0px 0px var(--black)'
                }}
              >
                <Headphones size={13} />
                <span>IT HELPDESK LEADS</span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--black)', marginBottom: '1rem' }}>
                Automate 80% of Routine IT Calls
              </h3>
              <p style={{ color: 'var(--charcoal)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 500, marginBottom: '1.5rem' }}>
                Empower employees to self-serve password unlocks, hardware ticket lookups, and account verifications via voice without tying up support engineers.
              </p>
            </div>

            <div style={{ borderTop: '2px solid var(--black)', paddingTop: '1rem', fontSize: '0.8rem', fontWeight: 800 }}>
              KEY BENEFIT: 10X RESOLUTION SPEED • 0% PRIVILEGE LEAKAGE
            </div>
          </div>

          {/* Card 2: Yellow (#ffe17c) with 8px hard shadow */}
          <div
            style={{
              backgroundColor: 'var(--yellow)',
              border: '2px solid var(--black)',
              borderRadius: '1rem',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '8px 8px 0px 0px var(--black)' /* 8px hard shadow */
            }}
          >
            <div>
              {/* White 'pill' badge at top */}
              <div
                style={{
                  backgroundColor: 'var(--white)',
                  border: '2px solid var(--black)',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1.5rem',
                  boxShadow: '2px 2px 0px 0px var(--black)'
                }}
              >
                <ShieldAlert size={13} />
                <span>CISOS & SOC TEAMS</span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--black)', marginBottom: '1rem' }}>
                Enforce Zero-Trust On Autonomous Agents
              </h3>
              <p style={{ color: 'var(--charcoal)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 600, marginBottom: '1.5rem' }}>
                Sleep soundly knowing that even if a conversational voice agent is coerced by a social engineer, ArmorIQ intercepts privilege escalation before tools execute.
              </p>
            </div>

            <div style={{ borderTop: '2px solid var(--black)', paddingTop: '1rem', fontSize: '0.8rem', fontWeight: 800 }}>
              KEY BENEFIT: DETERMINISTIC COMPLIANCE • REAL-TIME FORENSICS
            </div>
          </div>

          {/* Card 3: Dark Gray (#272727) with white text */}
          <div
            style={{
              backgroundColor: 'var(--gray-dark)',
              color: 'var(--white)',
              border: '2px solid var(--black)',
              borderRadius: '1rem',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '4px 4px 0px 0px var(--black)'
            }}
          >
            <div>
              {/* White 'pill' badge at top */}
              <div
                style={{
                  backgroundColor: 'var(--white)',
                  color: 'var(--black)',
                  border: '2px solid var(--black)',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1.5rem',
                  boxShadow: '2px 2px 0px 0px var(--black)'
                }}
              >
                <Cpu size={13} color="var(--black)" />
                <span>AI PLATFORM ARCHITECTS</span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--white)', marginBottom: '1rem' }}>
                Standardized Model Context Protocol Tools
              </h3>
              <p style={{ color: 'var(--sage)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 500, marginBottom: '1.5rem' }}>
                Connect your internal tools using standard MCP server protocols. Plug in ArmorIQ SDK with one API key without managing complex cloud IAM roles.
              </p>
            </div>

            <div style={{ borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--yellow)', fontWeight: 800 }}>
              KEY BENEFIT: 5-MINUTE INTEGRATION • OPEN PROTOCOL COMPATIBLE
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section
      style={{
        backgroundColor: 'var(--yellow)',
        borderBottom: '2px solid var(--black)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '2px solid var(--black)',
            padding: '6px 16px',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            boxShadow: '3px 3px 0px 0px var(--black)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1.5rem'
          }}
        >
          <Zap size={14} fill="var(--black)" />
          <span>ZERO-TRUST AGENT GOVERNANCE</span>
        </div>

        {/* Large Centered Heading */}
        <h2
          style={{
            fontSize: '4.2rem',
            color: 'var(--black)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            letterSpacing: '-0.04em'
          }}
        >
          Ready to Deploy Secure AI Voice Agents?
        </h2>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--charcoal)',
            maxWidth: '650px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
            fontWeight: 600
          }}
        >
          Protect your enterprise MCP tools, prevent prompt injection drift, and satisfy SOC audits with ArmorIQ runtime intent verification.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="#interactive-demo"
            className="btn-neo-primary"
            style={{ fontSize: '1.05rem', padding: '1rem 2.2rem' }}
          >
            <span>Launch Live Interactive Demo</span>
            <ArrowRight size={18} />
          </a>

          <a
            href="https://platform.armoriq.ai"
            target="_blank"
            rel="noreferrer"
            className="btn-neo-secondary"
            style={{ fontSize: '1.05rem', padding: '1rem 2.2rem' }}
          >
            <ShieldCheck size={18} />
            <span>Open ArmorIQ Platform</span>
          </a>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, Sparkles, Shield, Volume2 } from 'lucide-react';
import InteractiveBrowserMockup from './InteractiveBrowserMockup';

export default function HeroSection({
  latestResult,
  isProcessing,
  isSpeaking,
  onSendMessage,
  onPlayAudio,
  auditLogs
}) {
  return (
    <section
      className="bg-yellow-dots"
      style={{
        borderBottom: '2px solid var(--black)',
        padding: '4.5rem 2rem 5rem',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(420px, 1.05fr) minmax(480px, 1.25fr)',
          gap: '3.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Badge: 'NEW: AI Voice Helpdesk 2.0' (White, pill-shaped, 2px border) */}
          <div
            style={{
              backgroundColor: 'var(--white)',
              border: '2px solid var(--black)',
              borderRadius: '9999px',
              padding: '6px 16px',
              boxShadow: '4px 4px 0px 0px var(--black)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              width: 'fit-content'
            }}
          >
            <Sparkles size={14} color="var(--black)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              NEW: Autonomous Voice Agent 2.0
            </span>
          </div>

          {/* Heading: Cabinet Grotesk 8xl with keyword using -webkit-text-stroke: 2px black and transparent fill */}
          <h1
            style={{
              fontSize: 'clamp(3.2rem, 5.5vw, 5.2rem)',
              color: 'var(--black)',
              lineHeight: 0.98,
              letterSpacing: '-0.04em'
            }}
          >
            SPOKEN IT ACTIONS WITH{' '}
            <span className="stroke-keyword">UNBREAKABLE</span>{' '}
            INTENT CONTROL.
          </h1>

          {/* Body in Satoshi */}
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--charcoal)',
              lineHeight: 1.6,
              fontWeight: 500,
              maxWidth: '540px'
            }}
          >
            Employees resolve locked accounts and IT requests via natural <strong>ElevenLabs</strong> voice. Every tool call is cryptographically signed and governed at runtime by <strong>ArmorIQ</strong>—preventing privilege escalation before tools ever execute.
          </p>

          {/* CTA Group: Primary black button with 8px hard shadow, secondary white button with 4px hard shadow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#interactive-demo"
              className="btn-neo-primary"
            >
              <span>Test Voice Agent Live</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="https://platform.armoriq.ai"
              target="_blank"
              rel="noreferrer"
              className="btn-neo-secondary"
            >
              <Shield size={18} />
              <span>ArmorIQ Control Plane</span>
            </a>
          </div>

          {/* Feature Highlights Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.06)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }}>
              ✓ ElevenLabs Turbo v2.5
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.06)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }}>
              ✓ it-helpdesk-mcp Server
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.06)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }}>
              ✓ Ed25519 Intent Tokens
            </span>
          </div>

        </div>

        {/* Right Column: Browser Mockup Dashboard (White, 2px border, 12px hard shadow) */}
        <div>
          <InteractiveBrowserMockup
            latestResult={latestResult}
            isProcessing={isProcessing}
            isSpeaking={isSpeaking}
            onSendMessage={onSendMessage}
            onPlayAudio={onPlayAudio}
            auditLogs={auditLogs}
          />
        </div>

      </div>
    </section>
  );
}

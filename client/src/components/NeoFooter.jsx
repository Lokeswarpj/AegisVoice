import React from 'react';
import { Code2, Globe, MessageSquare, Terminal, Zap } from 'lucide-react';

export default function NeoFooter() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--charcoal)',
        color: 'var(--white)',
        padding: '5rem 2rem 2.5rem',
        borderTop: '2px solid var(--black)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 4-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Column 1: Brand & Tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'var(--yellow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--black)'
                }}
              >
                <Zap size={20} color="var(--black)" fill="var(--black)" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800 }}>
                AEGISVOICE IT
              </span>
            </div>

            <p style={{ color: 'var(--sage)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Autonomous voice IT-helpdesk agent governed by ArmorIQ runtime intent security and ElevenLabs voice AI.
            </p>

            {/* Social Icons: 10x10 (40px) squares in #272727 with light gray borders that turn Yellow/Black on hover */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: Code2, href: 'https://github.com/ArmorIQ', label: 'GitHub' },
                { icon: Globe, href: 'https://armoriq.ai', label: 'Website' },
                { icon: MessageSquare, href: 'https://discord.com', label: 'Discord' },
                { icon: Terminal, href: 'https://docs.armoriq.ai', label: 'Docs' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'var(--gray-dark)',
                      border: '2px solid #6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--white)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--yellow)';
                      e.currentTarget.style.color = 'var(--black)';
                      e.currentTarget.style.borderColor = 'var(--black)';
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = '3px 3px 0px 0px var(--white)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--gray-dark)';
                      e.currentTarget.style.color = 'var(--white)';
                      e.currentTarget.style.borderColor = '#6b7280';
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--yellow)', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="#how-it-works" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Intent Control Plane</a></li>
              <li><a href="#features" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Model Context Protocol (MCP)</a></li>
              <li><a href="#problem" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Privilege Escalation Sentry</a></li>
              <li><a href="https://platform.armoriq.ai" target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', textDecoration: 'none' }}>ArmorIQ Dashboard</a></li>
            </ul>
          </div>

          {/* Column 3: Technologies */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--yellow)', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
              Technologies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="https://armoriq.ai" target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', textDecoration: 'none' }}>@armoriq/sdk (v0.6.10)</a></li>
              <li><a href="https://elevenlabs.io" target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', textDecoration: 'none' }}>ElevenLabs Turbo v2.5</a></li>
              <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Anthropic MCP Protocol</a></li>
              <li><a href="https://docs.armoriq.ai" target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', textDecoration: 'none' }}>CSRG-IAP Specification</a></li>
            </ul>
          </div>

          {/* Column 4: Compliance & Hackathon */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--yellow)', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
              Hackathon Track
            </h4>
            <p style={{ color: 'var(--sage)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Built for the ArmorIQ Agent Security Hackathon & ElevenLabs Prize.
            </p>
            <div style={{ backgroundColor: 'var(--gray-dark)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--yellow)' }}>
              Proof: ALLOWED (200) & BLOCKED (403) verified.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
          <div>
            © 2026 AegisVoice IT • Protected by ArmorIQ Runtime Security Fabric.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Zero-Trust Architecture</span>
            <span>Ed25519 Cryptographic Verification</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

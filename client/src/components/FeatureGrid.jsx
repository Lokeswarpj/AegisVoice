import React from 'react';
import { ShieldCheck, Volume2, Network, KeyRound, LockKeyhole, FileSpreadsheet } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Intent-Aware Control Fabric',
    description: 'Intercepts the LLM reasoning loop to verify planned tool calls against cryptographically signed execution tokens before execution.'
  },
  {
    icon: Volume2,
    title: 'ElevenLabs Voice Engine',
    description: 'Lifelike conversational speech synthesis powered by Turbo v2.5, delivering instantaneous voice responses and clear audible security alerts.'
  },
  {
    icon: Network,
    title: 'MCP Server Governance',
    description: 'Seamless integration with Anthropic Model Context Protocol servers to govern tools like Active Directory, IAM role grants, and cloud APIs.'
  },
  {
    icon: KeyRound,
    title: 'Privilege Escalation Guard',
    description: 'Deterministic policy sentries that automatically block unauthorized role promotions, root credentials, or administrative cloud access.'
  },
  {
    icon: LockKeyhole,
    title: 'Tamper-Evident Tokens',
    description: 'CSRG-IAP Ed25519 signatures and canonical SHA-256 plan hashes guarantee that mid-turn intent drift is cryptographically caught and rejected.'
  },
  {
    icon: FileSpreadsheet,
    title: 'Instant SOC Compliance',
    description: 'Every allowed tool call and blocked violation is streamed to platform.armoriq.ai for real-time forensics and audit compliance.'
  }
];

export default function FeatureGrid() {
  return (
    <section
      id="features"
      style={{
        backgroundColor: 'var(--yellow)',
        borderTop: '2px solid var(--black)',
        borderBottom: '2px solid var(--black)',
        padding: '5rem 2rem'
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
            ENTERPRISE CAPABILITIES
          </span>
          <h2 style={{ fontSize: '3rem', color: 'var(--black)' }}>
            The Full-Stack Agent Security Engine
          </h2>
        </div>

        {/* 3-Column Grid of White Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--white)',
                  border: '2px solid var(--black)',
                  boxShadow: '4px 4px 0px 0px var(--black)',
                  borderRadius: '0.75rem', /* 12px */
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px 0px var(--black)';
                  const iconBox = e.currentTarget.querySelector('.neo-icon-box');
                  if (iconBox) iconBox.style.backgroundColor = 'var(--yellow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px 0px var(--black)';
                  const iconBox = e.currentTarget.querySelector('.neo-icon-box');
                  if (iconBox) iconBox.style.backgroundColor = 'var(--sage)';
                }}
              >
                {/* 16x16 (64px) Icon box in #b7c6c2 that turns #ffe17c on hover */}
                <div
                  className="neo-icon-box"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'var(--sage)',
                    border: '2px solid var(--black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '3px 3px 0px 0px var(--black)',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <Icon size={28} color="var(--black)" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem', /* 2xl */
                    color: 'var(--black)',
                    fontWeight: 800
                  }}
                >
                  {feat.title}
                </h3>

                <p style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 500 }}>
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

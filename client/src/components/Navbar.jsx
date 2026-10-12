import React from 'react';
import { Shield, Volume2, Server, ExternalLink, Settings, RotateCcw } from 'lucide-react';

export default function Navbar({ status, onOpenSettings, onResetSandbox }) {
  return (
    <header className="glass-panel" style={{ margin: '16px 20px', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
        }}>
          <Shield size={24} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #FFFFFF, #93C5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AegisVoice IT
            </h1>
            <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', color: '#C4B5FD', border: '1px solid rgba(139, 92, 246, 0.3)', fontWeight: 600 }}>
              ARMORIQ + ELEVENLABS
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Autonomous IT Helpdesk Governed by Runtime Intent Verification
          </p>
        </div>
      </div>

      {/* Live Service Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* ArmorIQ Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <Shield size={14} color="#A78BFA" />
          <span style={{ fontSize: '0.75rem', color: '#E2E8F0' }}>ArmorIQ:</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: status?.isLiveConfigured ? 'var(--emerald-allow)' : '#F59E0B' }}>
            {status?.isLiveConfigured ? 'Live Authenticated' : 'Active (Workspace)'}
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--emerald-allow)', display: 'inline-block' }}></span>
        </div>

        {/* ElevenLabs Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          <Volume2 size={14} color="#38BDF8" />
          <span style={{ fontSize: '0.75rem', color: '#E2E8F0' }}>ElevenLabs:</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: status?.elevenLabsConfigured ? 'var(--cyan-voice)' : 'var(--text-muted)' }}>
            {status?.elevenLabsConfigured ? 'Turbo v2.5' : 'Browser WebSpeech'}
          </span>
        </div>

        {/* MCP Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
          <Server size={14} color="#94A3B8" />
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>MCP:</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E2E8F0' }}>it-helpdesk-mcp</span>
        </div>

        {/* Platform Direct Link */}
        <a
          href="https://platform.armoriq.ai"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#A5B4FC',
            fontSize: '0.75rem',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          <span>ArmorIQ Dashboard</span>
          <ExternalLink size={12} />
        </a>

        {/* Reset Sandbox */}
        <button
          onClick={onResetSandbox}
          title="Reset IT Sandbox Directory"
          style={{
            padding: '7px 10px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <RotateCcw size={14} />
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          title="API Keys & Settings"
          style={{
            padding: '7px 10px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--border-subtle)',
            color: '#E2E8F0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Settings size={14} />
        </button>
      </div>
    </header>
  );
}

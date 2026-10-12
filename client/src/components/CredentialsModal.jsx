import React, { useState } from 'react';
import { X, Key, Shield, Volume2, Save, Check } from 'lucide-react';

export default function CredentialsModal({ isOpen, onClose, status, onUpdateKeys }) {
  const [armoriqKey, setArmoriqKey] = useState(status?.apiKeyMasked ? '' : '');
  const [elevenlabsKey, setElevenlabsKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateKeys({
      armoriqApiKey: armoriqKey.trim() || undefined,
      elevenlabsApiKey: elevenlabsKey.trim() || undefined
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '24px', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Key size={20} color="#8B5CF6" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>Platform Credentials</h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* ArmorIQ API Key */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#DDD6FE', marginBottom: '6px' }}>
              <Shield size={14} color="#A78BFA" />
              <span>ArmorIQ API Key (platform.armoriq.ai)</span>
            </label>
            <input
              type="password"
              placeholder={status?.apiKeyMasked || 'ak_live_...'}
              value={armoriqKey}
              onChange={(e) => setArmoriqKey(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Currently active in Lokeswar PJ's Workspace.
            </div>
          </div>

          {/* ElevenLabs API Key */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#BAE6FD', marginBottom: '6px' }}>
              <Volume2 size={14} color="#38BDF8" />
              <span>ElevenLabs API Key (elevenlabs.io)</span>
            </label>
            <input
              type="password"
              placeholder="Enter your ElevenLabs API Key for voice generation..."
              value={elevenlabsKey}
              onChange={(e) => setElevenlabsKey(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Optional: If omitted, the agent uses the Web Speech audio fallback.
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: savedSuccess ? 'var(--emerald-allow)' : 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            {savedSuccess ? <Check size={16} /> : <Save size={16} />}
            <span>{savedSuccess ? 'Credentials Saved!' : 'Save & Update'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

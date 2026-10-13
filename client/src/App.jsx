import React, { useState, useEffect, useRef } from 'react';
import NeoNavbar from './components/NeoNavbar';
import HeroSection from './components/HeroSection';
import SocialProofMarquee from './components/SocialProofMarquee';
import ProblemVsSolution from './components/ProblemVsSolution';
import FeatureGrid from './components/FeatureGrid';
import HowItWorks from './components/HowItWorks';
import UseCasePersonas from './components/UseCasePersonas';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import NeoFooter from './components/NeoFooter';
import CredentialsModal from './components/CredentialsModal';

export default function App() {
  const [status, setStatus] = useState(null);
  const [policies, setPolicies] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [latestResult, setLatestResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const currentAudioRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || '';

  // Fetch telemetry & ArmorIQ status
  const fetchTelemetry = async () => {
    try {
      const [resStatus, resPolicies, resLogs] = await Promise.all([
        fetch(`${API_BASE_URL}/api/status`).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/policies`).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/audit-logs`).then(r => r.json())
      ]);
      setStatus(resStatus);
      setPolicies(resPolicies);
      setAuditLogs(resLogs.logs || []);
    } catch (err) {
      console.warn('Backend telemetry error:', err.message);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 6000);
    return () => clearInterval(interval);
  }, []);

  // Audio Unlocker for browser autoplay policies
  const unlockAudio = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
      }
    } catch (e) {
      console.debug('Audio unlock bypassed:', e);
    }
  };

  // Browser Web Speech Synthesis with Chromium GC protection
  const speakBrowserVoice = (text) => {
    if (!('speechSynthesis' in window) || !text) {
      setIsSpeaking(false);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        // Retain reference on window to prevent V8 garbage collection during speech
        window._activeSpeechUtterance = utterance;
        utterance.rate = 1.02;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Jenny') || v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Guy'))
        ) || voices.find(v => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          window._activeSpeechUtterance = null;
        };
        utterance.onerror = (e) => {
          console.warn('Speech synthesis utterance error:', e);
          setIsSpeaking(false);
          window._activeSpeechUtterance = null;
        };

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }, 60);
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      setIsSpeaking(false);
    }
  };

  // Voice Audio Playback: ElevenLabs Base64 MP3 or Browser Web Speech
  const playAudio = (spokenText, ttsAudio) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    if (ttsAudio && ttsAudio.success && ttsAudio.audioBase64) {
      // ElevenLabs Base64 audio
      try {
        const audio = new Audio(`data:audio/mpeg;base64,${ttsAudio.audioBase64}`);
        currentAudioRef.current = audio;
        setIsSpeaking(true);

        audio.onended = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
          if (spokenText) speakBrowserVoice(spokenText);
        };

        audio.play().catch(e => {
          console.warn('Audio play autoplay restricted, falling back to speech synthesis:', e);
          setIsSpeaking(false);
          if (spokenText) speakBrowserVoice(spokenText);
        });
      } catch (err) {
        if (spokenText) speakBrowserVoice(spokenText);
      }
    } else if (spokenText) {
      speakBrowserVoice(spokenText);
    }
  };

  // Main Handle Voice / Chat Request
  const handleSendMessage = async (text) => {
    if (!text || isProcessing) return;

    unlockAudio();
    setIsProcessing(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/voice-agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          employeeEmail: 'alex.chen@enterprise.com'
        })
      });

      const data = await response.json();
      setLatestResult(data);

      if (data.spokenText) {
        playAudio(data.spokenText, data.ttsAudio);
      }

      fetchTelemetry();
    } catch (err) {
      console.error('Agent execution error:', err);
      setLatestResult({
        spokenText: `Network error connecting to backend: ${err.message}`,
        verdict: 'BLOCKED',
        blockDetails: { matchedRule: 'NETWORK_ERROR', reason: err.message }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Update Credentials
  const handleUpdateKeys = async (keys) => {
    try {
      await fetch(`${API_BASE_URL}/api/update-keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keys)
      });
      fetchTelemetry();
    } catch (err) {
      console.warn('Update keys error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Navigation */}
      <NeoNavbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        status={status}
        onSendMessage={handleSendMessage}
      />

      {/* 2. Hero Section with Browser Mockup */}
      <HeroSection
        latestResult={latestResult}
        isProcessing={isProcessing}
        isSpeaking={isSpeaking}
        onSendMessage={handleSendMessage}
        onPlayAudio={playAudio}
        auditLogs={auditLogs}
      />

      {/* 3. Social Proof Marquee */}
      <SocialProofMarquee />

      {/* 4. Problem vs Solution */}
      <ProblemVsSolution />

      {/* 5. Feature Grid */}
      <FeatureGrid />

      {/* 6. How It Works (Dark Mode Flow) */}
      <HowItWorks />

      {/* 7. Use Case Personas Bento */}
      <UseCasePersonas />

      {/* 8. Testimonials (Asymmetric Cards) */}
      <Testimonials />

      {/* 9. Final CTA */}
      <FinalCTA onSendMessage={handleSendMessage} isProcessing={isProcessing} />

      {/* 10. Footer */}
      <NeoFooter />

      {/* Settings Modal */}
      <CredentialsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        status={status}
        onUpdateKeys={handleUpdateKeys}
      />
    </div>
  );
}

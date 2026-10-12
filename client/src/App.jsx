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

  // Fetch telemetry & ArmorIQ status
  const fetchTelemetry = async () => {
    try {
      const [resStatus, resPolicies, resLogs] = await Promise.all([
        fetch('http://localhost:5000/api/status').then(r => r.json()),
        fetch('http://localhost:5000/api/policies').then(r => r.json()),
        fetch('http://localhost:5000/api/audit-logs').then(r => r.json())
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

  // Voice Audio Playback: ElevenLabs Base64 MP3 or Browser Web Speech
  const playAudio = (spokenText, ttsAudio) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (ttsAudio && ttsAudio.success && ttsAudio.audioBase64) {
      // ElevenLabs Base64 audio
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
      };

      audio.play().catch(e => {
        console.warn('Audio play autoplay error:', e);
        setIsSpeaking(false);
      });
    } else if ('speechSynthesis' in window && spokenText) {
      // Web Speech API fallback
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Main Handle Voice / Chat Request
  const handleSendMessage = async (text) => {
    if (!text || isProcessing) return;

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/voice-agent', {
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
        spokenText: `Network error connecting to backend on port 5000: ${err.message}`,
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
      await fetch('http://localhost:5000/api/update-keys', {
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
      <FinalCTA />

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

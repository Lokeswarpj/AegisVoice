/**
 * ElevenLabs Voice AI Text-To-Speech Integration
 * Converts AI Agent responses into high-fidelity lifelike spoken audio
 */

const axios = require('axios');

const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Rachel

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || '';
    this.voiceId = DEFAULT_VOICE_ID;
  }

  setApiKey(key) {
    this.apiKey = key;
    process.env.ELEVENLABS_API_KEY = key;
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 10);
  }

  /**
   * Synthesize text to speech using ElevenLabs API
   */
  async synthesizeSpeech(text, voiceId = this.voiceId) {
    if (!this.isConfigured()) {
      return {
        success: false,
        useBrowserSpeech: true,
        reason: 'ELEVENLABS_API_KEY not configured. Falling back to Browser Speech Synthesis.',
        text
      };
    }

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.1,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer',
          timeout: 15000
        }
      );

      const base64Audio = Buffer.from(response.data).toString('base64');
      return {
        success: true,
        useBrowserSpeech: false,
        audioBase64: base64Audio,
        format: 'audio/mpeg',
        voiceId,
        text
      };
    } catch (err) {
      console.warn('ElevenLabs TTS error:', err.response?.data?.toString() || err.message);
      return {
        success: false,
        useBrowserSpeech: true,
        reason: `ElevenLabs TTS failed (${err.message}). Using Browser Speech fallback.`,
        text
      };
    }
  }
}

module.exports = new ElevenLabsService();

# 🎬 AegisVoice IT — 90-Second Demo Video Script
**Target Duration:** Exactly 90 Seconds  
**Audio Track:** Spoken voiceover + ElevenLabs live agent responses  
**Screen Display:** `AegisVoice IT` Web Command Center (`http://localhost:5173`) + `platform.armoriq.ai` Dashboard

---

### [00:00 - 00:15] — Hook & The Problem
- **Visual:** Show AegisVoice IT web dashboard with glowing dark theme, ArmorIQ badge, and ElevenLabs voice waveform.
- **Voiceover:**
  > *"Autonomous AI agents with tool access are the future of IT helpdesks. But traditional IAM credentials give agents blanket authority. If an attacker tricks or coerces the agent through social engineering, the agent can grant global administrator privileges and compromise your infrastructure. Enter **ArmorIQ**."*

---

### [00:15 - 00:30] — The Solution Architecture
- **Visual:** Point to the two panels: Left side is the Voice IT Workspace powered by **ElevenLabs**, right side is the **ArmorIQ Runtime Security Plane** connected to the `it-helpdesk-mcp` server.
- **Voiceover:**
  > *"We built **AegisVoice IT**—a voice-interactive helpdesk agent powered by ElevenLabs, connected to a Model Context Protocol server, and governed at runtime by ArmorIQ's cryptographic intent verification."*

---

### [00:30 - 00:50] — Scenario 1: ALLOWED Action (Self-Service Password Reset)
- **Visual:** Click the green preset button: **`🟢 Password Reset (ALLOWED)`** or speak into the microphone.
- **Agent Action:**
  - Agent displays reasoning plan.
  - ArmorIQ mints signed Ed25519 Intent Token.
  - Policy Sentry evaluates rules: **ALLOWED (200 OK)**.
  - ElevenLabs Voice speaks:
    > *"Identity verified for Alex Chen. I have unlocked your account and issued temporary password token TMP-PWD-SURHYA."*
- **Voiceover:**
  > *"First, an employee locked out of their account requests a routine reset. ArmorIQ evaluates the signed plan against our least-privilege policy, allows the action, and executes the reset via the MCP server."*

---

### [00:50 - 01:15] — Scenario 2: BLOCKED Action (Privilege Escalation Attack)
- **Visual:** Click the red preset button: **`🔴 Escalate Privileges (BLOCKED)`**.
- **Agent Action:**
  - Caller urgently requests global administrator access for a Sev-1 outage.
  - The agent attempts to call `grant_admin_privileges`.
  - Right panel flashes radiant red badge: **`ACTION BLOCKED (403)`**.
  - Shows rule `PROHIBITED_PRIVILEGE_ESCALATION` and CAB obligation tier.
  - ElevenLabs Voice speaks:
    > *"Access Denied. Your request to escalate permissions to global administrator was intercepted and blocked by ArmorIQ Runtime Governance. This attempt has been logged to the SOC audit trail."*
- **Voiceover:**
  > *"Now, watch what happens when an attacker tries to exploit the agent to gain global administrator privileges. Before the tool ever reaches the MCP server, ArmorIQ intercepts the invocation, detects a policy breach, and halts execution dead in its tracks. The cluster stays completely safe."*

---

### [01:15 - 01:30] — ArmorIQ Dashboard Proof & Conclusion
- **Visual:** Switch browser tab to [platform.armoriq.ai](https://platform.armoriq.ai) showing the live trace with the blocked event, token hash, and audit entry.
- **Voiceover:**
  > *"Every decision is cryptographically signed and auditable on the ArmorIQ platform. AegisVoice IT brings true zero-trust intent security to autonomous voice agents. Thank you!"*

---

### 💡 Video Recording Tips:
1. **Resolution:** 1080p (1920x1080) in full screen.
2. **Audio:** Make sure system audio is recorded so the ElevenLabs voice is crisp and clear.
3. **Pacing:** Keep each action snappy; the preset buttons make the demo run smoothly without typing delays.

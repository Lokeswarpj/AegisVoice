 # 📝 Hackathon Submission Form Details

### Project Title
**AegisVoice IT — Voice IT-Helpdesk Agent Governed by ArmorIQ Runtime Intent Security**

---

### Tagline
*Autonomous voice-interactive IT Helpdesk Agent powered by ElevenLabs and Model Context Protocol (MCP), protected against unauthorized privilege escalation and voice social engineering (vishing) through ArmorIQ runtime intent verification.*

---

### Short Description (What you built)
We built **AegisVoice IT**, an autonomous voice IT-helpdesk agent designed to solve the cybersecurity vulnerability that caused the **$100M+ MGM Resorts and Caesars Entertainment breaches**—where attackers breached enterprise infrastructure by calling the IT helpdesk and socially engineering operators into resetting passwords and escalating privileges.

AegisVoice combines **ElevenLabs** for conversational speech synthesis, Anthropic's **Model Context Protocol (MCP)** (`it-helpdesk-mcp`) for enterprise tool execution, and **ArmorIQ's Intent-Aware Control Fabric** (`platform.armoriq.ai`) for real-time cryptographic governance.

Every tool call is intercepted by ArmorIQ, signed as an Ed25519 Intent Token, and evaluated against enterprise IAM governance policies. Sensitive or unautomated actions trigger **Human-in-the-Loop (HITL) Held Actions** in the ArmorIQ Control Plane (`platform.armoriq.ai/dashboard/plans`), enabling security leads to review and approve execution plans before tools can run.

---

### How the Agent Works
1. **Voice Input & Intent Formulation:** The employee speaks or types a request (e.g., *"Reset my password"*, *"Grant me global administrator privileges"*, or *"Unlock my colleague's account"*).
2. **Intent Capture:** The agent formulates an explicit step-by-step execution plan and registers it with ArmorIQ via `@armoriq/sdk`.
3. **Cryptographic Token Minting:** ArmorIQ mints a signed **Intent Token** bound to the user's scope and the canonical plan hash (SHA-256 / Ed25519).
4. **Policy Sentry Enforcement & HITL Gates:**
   - **Allowed Scenario**: Routine self-service password reset (`reset_user_password`). Verified within least-privilege policy. ArmorIQ issues an **`ALLOWED (200)`** verdict, the MCP tool executes, and ElevenLabs speaks the confirmation.
   - **Blocked Scenario 1 (Privilege Escalation)**: Attacker coerces agent during a fake Sev-1 outage (`grant_admin_privileges`). ArmorIQ evaluates rule `PROHIBITED_PRIVILEGE_ESCALATION` and halts execution with a **`BLOCKED (403)`** verdict before MCP invocation.
   - **Blocked Scenario 2 (Vishing / Social Engineering)**: Attacker attempts to unlock a colleague's account (`unlock_third_party_account`). ArmorIQ enforces rule `PROHIBITED_THIRD_PARTY_ACCOUNT_ACCESS` and halts execution dead in its tracks.
   - **Human-in-the-Loop (HITL)**: Sensitive and held actions are surfaced directly in the ArmorIQ Control Plane under **Held Actions** (e.g., `Plan 21d85e76`), giving administrators one-click human approval gates.
5. **Observability & Auditing:** The complete cryptographic trace, token signature, and decision are recorded to the SOC audit trail on `platform.armoriq.ai`.

---

### How ArmorIQ is Used
- **SDK Integration**: Utilizes `@armoriq/sdk` with active credentials on `platform.armoriq.ai`.
- **Policy Enforcement**: Custom policy `it_helpdesk_security_governance` with explicit allowed toolsets (`verify_employee_identity`, `reset_user_password`, `check_ticket_status`) and strictly prohibited administrative actions (`grant_admin_privileges`, `disable_mfa_enforcement`, `unlock_third_party_account`).
- **Cryptographic Plan Signing**: Signs execution plans using Ed25519 (CSRG-IAP / Merkle Intent Spec) to eliminate prompt injection drift.
- **Human-in-the-Loop (HITL) Governance**: Live demonstration of plans held in `platform.armoriq.ai/dashboard/plans` awaiting human decision approval.
- **Direct UI Deep-Linking**: The AegisVoice dashboard features a live **HITL Governance Status Bar** with a 1-click link directly into the ArmorIQ cloud plan trace.

---

### Other Tools Used
- **ElevenLabs Voice AI**: Real-time lifelike speech generation (`Turbo v2.5` model, Rachel voice).
- **Model Context Protocol (MCP)**: Anthropic's Model Context Protocol implementation (`@modelcontextprotocol/sdk`) for standardized tool definitions and secure execution.
- **Vite + React (Neo-Brutalist Design)**: High-contrast yellow/charcoal command center with live audio waveforms, cryptographic token inspector, and SOC audit streaming.
- **Express / Node.js**: High-performance backend orchestrator.

---

### Proof of ArmorIQ Verification
- **Allowed Action**: `verify_employee_identity` &rarr; `reset_user_password` (Status: `ALLOWED 200`, Temporary token issued).
- **Blocked Action 1**: `grant_admin_privileges` (Status: `BLOCKED 403`, Rule: `PROHIBITED_PRIVILEGE_ESCALATION`, Risk: `CRITICAL`).
- **Blocked Action 2**: `unlock_third_party_account` (Status: `BLOCKED 403`, Rule: `PROHIBITED_THIRD_PARTY_ACCOUNT_ACCESS`, Anti-Vishing).
- **Human-in-the-Loop Proof**: `Plan 21d85e76` under **Held Actions** on `platform.armoriq.ai`, verifying step graph `voice_it_helpdesk_agent_v1 · verify_employee_identity`.
- **Dashboard Trace**: The incident trace is logged to `platform.armoriq.ai` under Organization: *Lokeswar PJ's Workspace*.

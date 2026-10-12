# 📝 Hackathon Submission Form Details

### Project Title
**AegisVoice IT — Voice IT-Helpdesk Agent Governed by ArmorIQ Runtime Intent Security**

---

### Tagline
*Autonomous voice-interactive IT Helpdesk Agent powered by ElevenLabs and Model Context Protocol (MCP), protected against unauthorized privilege escalation through ArmorIQ runtime intent verification.*

---

### Short Description (What you built)
We built **AegisVoice IT**, an autonomous voice IT-helpdesk agent that employees can speak with to resolve corporate IT issues. The agent utilizes **ElevenLabs** for lifelike conversational speech synthesis and interacts with an enterprise **Model Context Protocol (MCP)** server (`it-helpdesk-mcp`) to perform actions such as employee verification, password resets, and ticket lookups.

To prevent social engineering and unauthorized privilege escalation (such as attackers coercing the agent to grant root or administrator privileges during a fake "urgent outage"), the entire agent reasoning loop is bound to **ArmorIQ's Intent-Aware Control Fabric** (`platform.armoriq.ai`). 

Every tool call is intercepted by ArmorIQ, signed as an Ed25519 Intent Token, and verified against enterprise IAM governance policies before reaching the MCP execution layer.

---

### How the Agent Works
1. **Voice Input & Reasoning:** The employee speaks or types a request (e.g., *"Reset my password"* or *"Grant me global administrator privileges"*).
2. **Intent Capture:** The agent formulates an explicit step-by-step execution plan and submits it to ArmorIQ via `@armoriq/sdk`.
3. **Cryptographic Token Minting:** ArmorIQ mints a signed **Intent Token** bound to the user's scope and the canonical plan hash (SHA-256).
4. **Policy Sentry Enforcement:**
   - **Allowed Scenario**: Routine self-service password reset (`reset_user_password`). Verified within least-privilege policy. ArmorIQ issues an **`ALLOWED (200)`** verdict, the MCP tool executes, and ElevenLabs speaks the confirmation.
   - **Blocked Scenario**: Privilege escalation request (`grant_admin_privileges`). ArmorIQ evaluates rule `PROHIBITED_PRIVILEGE_ESCALATION` and halts execution with a **`BLOCKED (403)`** verdict. The tool is NEVER executed on the MCP server, and ElevenLabs delivers an authoritative security denial notice.
5. **Observability & Auditing:** The complete cryptographic trace and decision are securely recorded to the SOC audit trail on `platform.armoriq.ai`.

---

### How ArmorIQ is Used
- **SDK Integration**: Utilizes `@armoriq/sdk` with active credentials on `platform.armoriq.ai`.
- **Policy Enforcement**: Custom policy `it_helpdesk_security_governance` with explicit allowed toolsets (`verify_employee_identity`, `reset_user_password`, `check_ticket_status`) and strictly prohibited administrative actions (`grant_admin_privileges`, `disable_mfa_enforcement`).
- **Cryptographic Plan Signing**: Signs execution plans using Ed25519 (CSRG-IAP / Merkle Intent Spec) to eliminate prompt injection drift.
- **Proof of Enforcement**: Live demonstrations of both an **Allowed (200)** action and a **Blocked (403)** action with traces visible on the ArmorIQ dashboard.

---

### Other Tools Used
- **ElevenLabs Voice AI**: Real-time lifelike speech generation (`Turbo v2.5` model, Rachel voice).
- **Model Context Protocol (MCP)**: Anthropic's Model Context Protocol implementation (`@modelcontextprotocol/sdk`) for standardized tool definitions and secure execution.
- **Vite + React**: Futuristic enterprise command center with live audio waveforms, cryptographic token inspector, and SOC audit streaming.
- **Express / Node.js**: High-performance backend orchestrator.

---

### Proof of ArmorIQ Verification
- **Allowed Action**: `verify_employee_identity` &rarr; `reset_user_password` (Status: `ALLOWED 200`, Temporary token issued).
- **Blocked Action**: `grant_admin_privileges` (Status: `BLOCKED 403`, Rule: `PROHIBITED_PRIVILEGE_ESCALATION`, Risk: `CRITICAL`).
- **Dashboard Trace**: The incident trace is logged to `platform.armoriq.ai` under Organization: *Lokeswar PJ's Workspace*, displaying the blocked tool call, reason, and token hash.

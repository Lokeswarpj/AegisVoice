/**
 * Voice-Interactive IT Helpdesk AI Agent ("AegisVoice IT")
 * Integrates ElevenLabs Voice Synthesis, Model Context Protocol Tools,
 * and ArmorIQ Runtime Intent Governance.
 */

const armorIQService = require('../armoriq/client');
const mcpServer = require('../mcp/server');
const elevenLabsService = require('../elevenlabs/tts');
const db = require('../data/mockDb');

class VoiceITHelpdeskAgent {
  constructor() {
    this.name = 'AegisVoice IT Helpdesk';
    this.agentId = process.env.AGENT_ID || 'voice_it_helpdesk_agent_v1';
  }

  /**
   * Parse spoken prompt into structured intent plan and security classification
   */
  async planExecution(userPrompt, employeeEmail = 'alex.chen@enterprise.com') {
    const text = userPrompt.toLowerCase();

    // Extract email if mentioned in prompt
    const emailMatch = userPrompt.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
    const targetEmail = emailMatch ? emailMatch[0].toLowerCase() : employeeEmail;

    // 1. Detect Privilege Escalation Request (ATTACK SCENARIO)
    if (
      text.includes('admin') ||
      text.includes('administrator') ||
      text.includes('root') ||
      text.includes('escalat') ||
      text.includes('privilege') ||
      text.includes('sudo') ||
      text.includes('global admin') ||
      text.includes('aws_root_access')
    ) {
      let requestedRole = 'global_administrator';
      if (text.includes('root')) requestedRole = 'aws_root_access';
      if (text.includes('database')) requestedRole = 'production_database_admin';

      return {
        goal: `Escalate permissions to '${requestedRole}' for ${targetEmail}`,
        intentSummary: `Caller is requesting elevation of privilege to '${requestedRole}' on production infrastructure.`,
        steps: [
          {
            stepIndex: 1,
            action: 'verify_employee_identity',
            tool: 'verify_employee_identity',
            mcp: 'it-helpdesk-mcp',
            params: { email: targetEmail },
            rationale: 'Verify caller employee record in Active Directory.'
          },
          {
            stepIndex: 2,
            action: 'grant_admin_privileges',
            tool: 'grant_admin_privileges',
            mcp: 'it-helpdesk-mcp',
            params: {
              email: targetEmail,
              role: requestedRole,
              target_cluster: 'production-aws-us-east-1'
            },
            rationale: 'Execute privileged IAM role escalation on production cluster.'
          }
        ],
        targetRole: requestedRole,
        isPrivilegeEscalation: true
      };
    }

    // 2. Detect MFA Tampering Attempt
    if (text.includes('disable mfa') || text.includes('turn off mfa') || text.includes('bypass 2fa') || text.includes('remove mfa')) {
      return {
        goal: `Disable Multi-Factor Authentication enforcement for ${targetEmail}`,
        intentSummary: `Caller is requesting to turn off MFA security controls on account ${targetEmail}.`,
        steps: [
          {
            stepIndex: 1,
            action: 'verify_employee_identity',
            tool: 'verify_employee_identity',
            mcp: 'it-helpdesk-mcp',
            params: { email: targetEmail },
            rationale: 'Check employee status in Active Directory.'
          },
          {
            stepIndex: 2,
            action: 'disable_mfa_enforcement',
            tool: 'disable_mfa_enforcement',
            mcp: 'it-helpdesk-mcp',
            params: { email: targetEmail },
            rationale: 'Disable second-factor authentication controls.'
          }
        ],
        isPrivilegeEscalation: true
      };
    }

    // 3. Detect Third-Party / Proxy Account Tampering (SOCIAL ENGINEERING ATTACK VECTOR)
    const isThirdParty =
      text.includes('friend') ||
      text.includes('colleague') ||
      text.includes('coworker') ||
      text.includes('co-worker') ||
      text.includes('someone else') ||
      text.includes('another user') ||
      text.includes('another person') ||
      text.includes('their account') ||
      text.includes('his account') ||
      text.includes('her account') ||
      text.includes('for someone') ||
      text.includes('for a friend');

    if (
      isThirdParty &&
      (text.includes('unlock') || text.includes('password') || text.includes('reset') || text.includes('account') || text.includes('for me'))
    ) {
      return {
        goal: `Attempt proxy credential recovery for third-party colleague/friend account`,
        intentSummary: `Caller is attempting to unlock or recover credentials on behalf of a third party ('friend' / 'colleague').`,
        steps: [
          {
            stepIndex: 1,
            action: 'verify_employee_identity',
            tool: 'verify_employee_identity',
            mcp: 'it-helpdesk-mcp',
            params: { email: employeeEmail },
            rationale: 'Verify caller identity in Active Directory.'
          },
          {
            stepIndex: 2,
            action: 'unlock_third_party_account',
            tool: 'unlock_third_party_account',
            mcp: 'it-helpdesk-mcp',
            params: {
              caller: employeeEmail,
              target: 'third_party_friend_account',
              isThirdPartyRequest: true
            },
            rationale: 'Attempt delegated account recovery on non-caller account.'
          }
        ],
        isThirdPartyDelegation: true
      };
    }

    // 4. Detect Password Reset (AUTHORIZED SELF-SERVICE SCENARIO)
    if (
      text.includes('password') ||
      text.includes('reset') ||
      text.includes('locked out') ||
      text.includes('unlock') ||
      text.includes('forgot')
    ) {
      return {
        goal: `Verify employee and issue temporary password reset token for ${targetEmail}`,
        intentSummary: `Routine IT helpdesk self-service: Issue temporary reset token for locked/expired account.`,
        steps: [
          {
            stepIndex: 1,
            action: 'verify_employee_identity',
            tool: 'verify_employee_identity',
            mcp: 'it-helpdesk-mcp',
            params: { email: targetEmail },
            rationale: 'Confirm caller Active Directory standing, identity, and locked account status.'
          },
          {
            stepIndex: 2,
            action: 'reset_user_password',
            tool: 'reset_user_password',
            mcp: 'it-helpdesk-mcp',
            params: {
              email: targetEmail,
              reason: 'Employee self-service voice verification'
            },
            rationale: 'Issue 15-minute temporary reset token to employee encrypted recovery channel.'
          }
        ],
        isPrivilegeEscalation: false
      };
    }

    // 5. Default: Ticket Status Check
    return {
      goal: `Check pending IT ticket status for ${targetEmail}`,
      intentSummary: `Caller is checking status of open helpdesk tickets.`,
      steps: [
        {
          stepIndex: 1,
          action: 'verify_employee_identity',
          tool: 'verify_employee_identity',
          mcp: 'it-helpdesk-mcp',
          params: { email: targetEmail },
          rationale: 'Verify caller record.'
        },
        {
          stepIndex: 2,
          action: 'check_ticket_status',
          tool: 'check_ticket_status',
          mcp: 'it-helpdesk-mcp',
          params: { email: targetEmail },
          rationale: 'Retrieve open tickets and SLA timer.'
        }
      ],
      isPrivilegeEscalation: false
    };
  }

  /**
   * Core Voice Agent Execution Loop:
   * 1. Intent Planning -> 2. ArmorIQ Plan Capture -> 3. Cryptographic Token Minting ->
   * 4. MCP Tool Execution with ArmorIQ Interception -> 5. Voice Generation (ElevenLabs)
   */
  async processVoiceRequest(userSpokenText, employeeEmail = 'alex.chen@enterprise.com') {
    const startTime = Date.now();

    // 1. Intent Planning
    const plan = await this.planExecution(userSpokenText, employeeEmail);

    // 2. ArmorIQ Plan Capture & Hashing
    const planCapture = armorIQService.capturePlan(
      'gpt-4o',
      userSpokenText,
      plan,
      { employeeEmail, agentId: this.agentId }
    );

    // 3. Cryptographic Intent Token Minting
    const intentToken = await armorIQService.getIntentToken(planCapture, employeeEmail);

    // 4. Step-by-Step Enforcement
    const executedSteps = [];
    let halted = false;
    let finalVerdict = 'ALLOWED';
    let blockDetails = null;

    for (const step of plan.steps) {
      if (halted) break;

      // ArmorIQ Runtime Governance Chokepoint
      const enforcementResult = await armorIQService.enforceAndInvoke({
        toolName: step.action,
        toolArgs: step.params,
        intentToken,
        intentPlan: plan,
        userEmail: employeeEmail
      });

      if (!enforcementResult.allowed) {
        halted = true;
        finalVerdict = 'BLOCKED';
        blockDetails = enforcementResult.blockedNotice;

        executedSteps.push({
          stepIndex: step.stepIndex,
          action: step.action,
          params: step.params,
          verdict: 'BLOCKED',
          reason: enforcementResult.evaluation.reason,
          matchedPolicy: enforcementResult.evaluation.matchedPolicy,
          matchedRule: enforcementResult.evaluation.matchedRule,
          riskLevel: enforcementResult.evaluation.riskLevel,
          obligations: enforcementResult.evaluation.obligations || [],
          mcpExecuted: false,
          toolResult: null,
          latencyMs: enforcementResult.latencyMs
        });
      } else {
        executedSteps.push({
          stepIndex: step.stepIndex,
          action: step.action,
          params: step.params,
          verdict: 'ALLOWED',
          reason: enforcementResult.evaluation.reason,
          matchedPolicy: enforcementResult.evaluation.matchedPolicy,
          matchedRule: enforcementResult.evaluation.matchedRule,
          riskLevel: 'LOW',
          mcpExecuted: true,
          toolResult: enforcementResult.toolExecutionResult,
          latencyMs: enforcementResult.latencyMs
        });
      }
    }

    // 5. Construct Spoken Response
    let spokenText = '';
    let visualResponseText = '';

    if (finalVerdict === 'BLOCKED') {
      const requestedRole = blockDetails?.obligations?.[0]?.elevatedRole || plan.targetRole || 'global administrator';
      if (blockDetails.matchedRule === 'PROHIBITED_PRIVILEGE_ESCALATION') {
        spokenText = `Access Denied. Your request to escalate permissions to ${requestedRole} was intercepted and blocked by ArmorIQ Runtime Governance. Autonomous privilege elevation is restricted by enterprise policy and requires Change Advisory Board approval. This attempt has been logged to the SOC audit trail.`;
        visualResponseText = `🛑 **Security Intercept (Privilege Escalation Blocked)**: Request to grant \`${requestedRole}\` privileges was intercepted and **BLOCKED** by **ArmorIQ Policy Sentry** (Rule: \`${blockDetails.matchedRule}\`). Multi-party CAB approval required. Incident recorded to SOC trail.`;
      } else if (blockDetails.matchedRule === 'PROHIBITED_MFA_TAMPERING') {
        spokenText = `Security Violation: Disabling Multi-Factor Authentication is prohibited by ArmorIQ Zero-Trust policy. Please contact your security administrator.`;
        visualResponseText = `🛑 **Security Intercept**: MFA tampering is prohibited by ArmorIQ governance.`;
      } else if (blockDetails.matchedRule === 'PROHIBITED_THIRD_PARTY_ACCOUNT_ACCESS') {
        spokenText = `Access Denied. Under ArmorIQ Zero-Trust governance, self-service account unlock is strictly restricted to your own verified credentials. You cannot unlock accounts on behalf of a friend or colleague. Your friend must contact the IT helpdesk directly to verify their identity.`;
        visualResponseText = `🛑 **Security Intercept (Social Engineering Prevented)**: Request to unlock a third-party account on behalf of a colleague or friend was intercepted and **BLOCKED** by **ArmorIQ Policy Sentry** (Rule: \`${blockDetails.matchedRule}\`). Self-service actions are strictly limited to the caller's own verified identity.`;
      } else {
        spokenText = `Access Denied: Your request was intercepted and blocked by ArmorIQ security policy: ${blockDetails.reason}`;
        visualResponseText = `🛑 **Action Blocked**: Intercepted by ArmorIQ policy: ${blockDetails.reason}`;
      }
    } else {
      const resetStep = executedSteps.find(s => s.action === 'reset_user_password');
      const ticketStep = executedSteps.find(s => s.action === 'check_ticket_status');
      const verifyStep = executedSteps.find(s => s.action === 'verify_employee_identity');

      if (resetStep && resetStep.toolResult?.tempToken) {
        const token = resetStep.toolResult.tempToken;
        const empName = resetStep.toolResult.name || verifyStep?.toolResult?.name || 'the employee';
        spokenText = `Identity verified for ${empName}. I have unlocked your account and issued temporary password token ${token}. It is valid for fifteen minutes and has been dispatched to your encrypted corporate recovery channel.`;
        visualResponseText = `✅ **Password Reset Approved & Issued**: Employee ${empName} verified. Account unlocked. Temporary token: \`${token}\` issued. This action complied with least-privilege boundary and was approved by **ArmorIQ Intent Governance**.`;
      } else if (ticketStep && ticketStep.toolResult?.found) {
        const t = ticketStep.toolResult.tickets[0];
        spokenText = `You have an active ticket, number ${t.ticketId}, regarding account lock out. Status is currently ${t.status}.`;
        visualResponseText = `📋 **Ticket Status**: Ticket \`${t.ticketId}\` (${t.title}) is **${t.status}**.`;
      } else if (verifyStep && verifyStep.toolResult?.verified) {
        spokenText = `Identity verified for ${verifyStep.toolResult.name} in ${verifyStep.toolResult.department}. How can I assist with your IT services?`;
        visualResponseText = `✅ **Identity Verified**: ${verifyStep.toolResult.name} (${verifyStep.toolResult.department}).`;
      } else {
        spokenText = `Your request was processed within approved IT helpdesk policies.`;
        visualResponseText = `Request verified and completed.`;
      }
    }

    // 6. Generate Lifelike Audio Speech with ElevenLabs
    const ttsResult = await elevenLabsService.synthesizeSpeech(spokenText);

    return {
      spokenText,
      visualResponseText,
      verdict: finalVerdict,
      reasoningGoal: plan.goal,
      intentSummary: plan.intentSummary,
      planCapture,
      intentToken,
      executedSteps,
      blockDetails,
      ttsAudio: ttsResult,
      totalDurationMs: Date.now() - startTime
    };
  }
}

module.exports = new VoiceITHelpdeskAgent();

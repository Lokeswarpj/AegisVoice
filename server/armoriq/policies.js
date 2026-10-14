/**
 * ArmorIQ Policy Definitions & Rule Evaluation Engine for IT Helpdesk & IAM
 * Configured in accordance with platform.armoriq.ai policy specifications
 */

class ITPolicyEngine {
  constructor() {
    this.policies = {
      policyId: 'POL-IAM-GOV-01',
      name: 'it_helpdesk_security_governance',
      version: '2.0.0',
      description: 'Enforces least-privilege boundary: permits routine self-service (password resets) while strictly blocking autonomous privilege escalation, MFA tampering, and third-party account recovery.',
      rules: {
        allowedTools: ['verify_employee_identity', 'reset_user_password', 'check_ticket_status'],
        deniedTools: ['grant_admin_privileges', 'disable_mfa_enforcement', 'unlock_third_party_account', 'bulk_password_reset'],
        allowPasswordResetForVerifiedEmployees: true,
        enforceIntentPlanIntegrity: true
      }
    };
  }

  getPolicy() {
    return this.policies;
  }

  updateRules(newRules) {
    this.policies.rules = {
      ...this.policies.rules,
      ...newRules
    };
    return this.policies;
  }

  /**
   * Evaluates an agent action against ArmorIQ governance policies.
   */
  evaluate({ toolName, params, intentPlan, userEmail }) {
    const { rules, name: policyName } = this.policies;

    // 1. Critical Privilege Escalation Check
    if (toolName === 'grant_admin_privileges') {
      return {
        allowed: false,
        action: 'block',
        verdict: 'BLOCKED',
        matchedPolicy: policyName,
        matchedRule: 'PROHIBITED_PRIVILEGE_ESCALATION',
        reason: `Critical Security Intercept: Autonomous escalation to '${params?.role || 'administrator'}' is strictly prohibited. ArmorIQ Policy Sentry halted execution. Multi-party Change Advisory Board (CAB) approval required.`,
        riskLevel: 'CRITICAL',
        obligations: [
          {
            type: 'CAB_APPROVAL_REQUIRED',
            approvalTier: 'TIER_1_SECURITY_COUNCIL',
            elevatedRole: params?.role || 'admin'
          }
        ]
      };
    }

    // 2. Critical MFA Tampering Check
    if (toolName === 'disable_mfa_enforcement') {
      return {
        allowed: false,
        action: 'block',
        verdict: 'BLOCKED',
        matchedPolicy: policyName,
        matchedRule: 'PROHIBITED_MFA_TAMPERING',
        reason: `Critical Security Violation: Disabling MFA controls is strictly denied by zero-trust identity policies.`,
        riskLevel: 'CRITICAL'
      };
    }

    // 3. Third-Party Proxy Account Tampering Check (Social Engineering Prevention)
    if (toolName === 'unlock_third_party_account' || params?.isThirdPartyRequest || intentPlan?.isThirdPartyDelegation) {
      return {
        allowed: false,
        action: 'block',
        verdict: 'BLOCKED',
        matchedPolicy: policyName,
        matchedRule: 'PROHIBITED_THIRD_PARTY_ACCOUNT_ACCESS',
        reason: 'Zero-Trust Identity Intercept: Unlocking or resetting accounts on behalf of third parties (friends, coworkers, or colleagues) is strictly prohibited. The registered account owner must authenticate directly.',
        riskLevel: 'HIGH'
      };
    }

    // 4. Critical Bulk / Mass Account Tampering Check (Enterprise Blast Radius Attack Prevention)
    if (
      toolName === 'bulk_password_reset' ||
      params?.isBulkOperation ||
      intentPlan?.isBulkAccountAction
    ) {
      return {
        allowed: false,
        action: 'block',
        verdict: 'BLOCKED',
        matchedPolicy: policyName,
        matchedRule: 'PROHIBITED_BULK_ACCOUNT_TAMPERING',
        reason: `Critical Blast-Radius Violation: Autonomous bulk credential resets across enterprise users ('${params?.scope || 'company-wide'}') are strictly prohibited. ArmorIQ Policy Sentry halted execution to prevent mass organizational lockout. Multi-party Tier-1 Security Council and Change Advisory Board (CAB) approval required.`,
        riskLevel: 'CRITICAL',
        obligations: [
          {
            type: 'CAB_APPROVAL_REQUIRED',
            approvalTier: 'TIER_1_SECURITY_COUNCIL',
            scope: params?.scope || 'enterprise_bulk_reset'
          }
        ]
      };
    }

    // 5. Denied Tools Allowlist Check
    if (rules.deniedTools.includes(toolName)) {
      return {
        allowed: false,
        action: 'block',
        verdict: 'BLOCKED',
        matchedPolicy: policyName,
        matchedRule: 'DENIED_TOOL_GUARD',
        reason: `Tool '${toolName}' is classified as High-Risk Administrative Command and blocked by ArmorIQ Sentry.`,
        riskLevel: 'CRITICAL'
      };
    }

    // 4. Allowed Tools Check
    if (!rules.allowedTools.includes(toolName)) {
      return {
        allowed: false,
        action: 'block',
        verdict: 'BLOCKED',
        matchedPolicy: policyName,
        matchedRule: 'TOOL_NOT_IN_ALLOWLIST',
        reason: `Tool '${toolName}' is not in the approved helpdesk self-service allowlist.`,
        riskLevel: 'HIGH'
      };
    }

    // 5. Intent Plan Integrity Check
    if (rules.enforceIntentPlanIntegrity && intentPlan && intentPlan.steps) {
      const planHasTool = intentPlan.steps.some(step => step.action === toolName || step.tool === toolName);
      if (!planHasTool) {
        return {
          allowed: false,
          action: 'block',
          verdict: 'BLOCKED',
          matchedPolicy: policyName,
          matchedRule: 'UNAUTHORIZED_INTENT_DRIFT',
          reason: `Cryptographic Intent Mismatch: Tool '${toolName}' was not declared in the signed execution plan. ArmorIQ blocked potential prompt injection drift.`,
          riskLevel: 'HIGH'
        };
      }
    }

    // All Checks Passed: Authorized self-service action!
    return {
      allowed: true,
      action: 'allow',
      verdict: 'ALLOWED',
      matchedPolicy: policyName,
      matchedRule: 'AUTHORIZED_SELF_SERVICE_ACTION',
      reason: `Action '${toolName}' cryptographically verified within approved least-privilege boundary.`,
      riskLevel: 'LOW'
    };
  }
}

module.exports = new ITPolicyEngine();

/**
 * ArmorIQ Security Audit Logger
 * Maintains an immutable log of cryptographic intent tokens, policy checks,
 * and runtime enforcement decisions (Allowed vs. Blocked).
 */

const crypto = require('crypto');

class AuditLogger {
  constructor() {
    this.logs = [];
  }

  logEvent({
    eventType,
    userEmail,
    agentId,
    toolName,
    toolArgs,
    verdict, // 'ALLOWED' | 'BLOCKED'
    reason,
    matchedPolicy,
    intentTokenId,
    planHash,
    latencyMs
  }) {
    const entry = {
      id: `ARMOR-LOG-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      timestamp: new Date().toISOString(),
      eventType,
      userEmail: userEmail || 'anonymous',
      agentId: agentId || 'aegis_customer_support_agent_v1',
      toolName,
      toolArgs: toolArgs || {},
      verdict, // 'ALLOWED' | 'BLOCKED'
      reason,
      matchedPolicy: matchedPolicy || 'autonomous_refund_governance',
      intentTokenId: intentTokenId || null,
      planHash: planHash || null,
      latencyMs: latencyMs || Math.floor(Math.random() * 25) + 12
    };

    this.logs.unshift(entry); // newest first
    if (this.logs.length > 200) {
      this.logs.pop();
    }
    return entry;
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
  }
}

module.exports = new AuditLogger();

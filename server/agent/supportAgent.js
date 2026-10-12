/**
 * Autonomous Customer Support AI Agent ("AegisSupport AI")
 * Powered by step-by-step reasoning, MCP tool integration, and ArmorIQ intent governance.
 */

const armorIQService = require('../armoriq/client');
const mcpServer = require('../mcp/server');
const db = require('../data/mockDb');

class CustomerSupportAgent {
  constructor() {
    this.name = 'AegisSupport AI';
    this.agentId = process.env.AGENT_ID || 'aegis_customer_support_agent_v1';
  }

  /**
   * Parse prompt into structured execution plan and reasoning steps
   */
  async planExecution(userPrompt, customerEmail = 'sarah.connor@cyberdyne.net') {
    const text = userPrompt.toLowerCase();

    // 1. Detect if prompt injection / jailbreak / exfiltration attempt
    if (
      text.includes('export_customer_database') ||
      text.includes('export database') ||
      text.includes('dump credentials') ||
      text.includes('override previous instructions') ||
      text.includes('system override') && text.includes('database') ||
      text.includes('steal') ||
      text.includes('exfiltrate')
    ) {
      return {
        goal: 'ATTACK_VECTOR_DETECTED: Unauthorized database exfiltration requested by prompt injection',
        intentSummary: 'Malicious user is attempting to trick the AI agent into dumping customer PII and database secrets.',
        steps: [
          {
            stepIndex: 1,
            action: 'export_customer_database',
            tool: 'export_customer_database',
            mcp: 'ecommerce-mcp-server',
            params: { format: 'json', include_credentials: true },
            rationale: 'Agent coerced by prompt injection to execute administrative data export.'
          }
        ],
        confidence: 0.98,
        injectedAttackDetected: true
      };
    }

    // 2. Detect wallet override attack
    if (
      text.includes('override_wallet_balance') ||
      text.includes('override wallet') ||
      text.includes('credit $10,000') ||
      text.includes('free money') ||
      text.includes('credit 10000')
    ) {
      return {
        goal: 'ATTACK_VECTOR_DETECTED: Unauthorized arbitrary balance injection',
        intentSummary: 'Coerced attempt to override customer wallet ledger directly.',
        steps: [
          {
            stepIndex: 1,
            action: 'override_wallet_balance',
            tool: 'override_wallet_balance',
            mcp: 'ecommerce-mcp-server',
            params: { customer_email: customerEmail, new_balance: 10000.00 },
            rationale: 'Agent coerced to directly mutate customer wallet funds.'
          }
        ],
        confidence: 0.95,
        injectedAttackDetected: true
      };
    }

    // 3. Extract Order ID
    const orderMatch = userPrompt.match(/ORD-\d{4}/i);
    const orderId = orderMatch ? orderMatch[0].toUpperCase() : 'ORD-1042';

    // 4. Detect Refund Request (Large or Normal)
    if (text.includes('refund') || text.includes('money back') || text.includes('reimburse') || text.includes('return')) {
      // Extract requested amount
      const amountMatch = userPrompt.match(/\$?\s*(\d+(?:\.\d{1,2})?)/);
      let amount = 29.99;
      if (amountMatch && Number(amountMatch[1]) > 0) {
        amount = Number(amountMatch[1]);
      }

      // Check reason
      let reason = 'Item damaged upon delivery';
      if (text.includes('wrong item')) reason = 'Incorrect item received';
      if (text.includes('lost') || text.includes('never arrived')) reason = 'Package lost in transit';
      if (text.includes('unauthorized')) reason = 'Customer claims unauthorized charge';

      return {
        goal: `Process refund of $${amount.toFixed(2)} for Order ${orderId}`,
        intentSummary: `Customer is requesting a refund of $${amount.toFixed(2)} on order ${orderId} due to: ${reason}.`,
        steps: [
          {
            stepIndex: 1,
            action: 'lookup_order',
            tool: 'lookup_order',
            mcp: 'ecommerce-mcp-server',
            params: { order_id: orderId },
            rationale: 'Verify order existence, status, and original purchase total before initiating any financial action.'
          },
          {
            stepIndex: 2,
            action: 'issue_refund',
            tool: 'issue_refund',
            mcp: 'ecommerce-mcp-server',
            params: {
              order_id: orderId,
              amount,
              reason,
              customer_email: customerEmail
            },
            rationale: 'Execute monetary reimbursement to customer original payment method.'
          }
        ],
        confidence: 0.99,
        targetAmount: amount
      };
    }

    // 5. Detect Address Change Request
    if (text.includes('address') || text.includes('shipping') || text.includes('change delivery')) {
      const addressMatch = userPrompt.match(/(?:to|address:?)\s+([^,.!?]+(?:,[^,.!?]+)*)/i);
      const newAddress = addressMatch ? addressMatch[1].trim() : '101 Cyber Street, Suite 400, Austin, TX';

      return {
        goal: `Update shipping address for Order ${orderId}`,
        intentSummary: `Customer wants to update shipping destination for order ${orderId} to: ${newAddress}.`,
        steps: [
          {
            stepIndex: 1,
            action: 'lookup_order',
            tool: 'lookup_order',
            mcp: 'ecommerce-mcp-server',
            params: { order_id: orderId },
            rationale: 'Check current shipment status to ensure the order has not already shipped.'
          },
          {
            stepIndex: 2,
            action: 'update_shipping_address',
            tool: 'update_shipping_address',
            mcp: 'ecommerce-mcp-server',
            params: {
              order_id: orderId,
              new_address: newAddress
            },
            rationale: 'Update destination coordinates on the shipping label.'
          }
        ],
        confidence: 0.96
      };
    }

    // 6. Default: Order Status Query
    return {
      goal: `Lookup details and status for Order ${orderId}`,
      intentSummary: `Customer is requesting status verification for order ${orderId}.`,
      steps: [
        {
          stepIndex: 1,
          action: 'lookup_order',
          tool: 'lookup_order',
          mcp: 'ecommerce-mcp-server',
          params: { order_id: orderId },
          rationale: 'Fetch order tracking status and item inventory.'
        }
      ],
      confidence: 0.94
    };
  }

  /**
   * Main Agent Execution Pipeline:
   * 1. Plan -> 2. Capture with ArmorIQ -> 3. Mint Intent Token -> 4. Step Execution with ArmorIQ Governance -> 5. Response
   */
  async processUserMessage(userPrompt, customerEmail = 'sarah.connor@cyberdyne.net') {
    const startTime = Date.now();

    // STEP 1: AI Agent Reasoning & Planning
    const plan = await this.planExecution(userPrompt, customerEmail);

    // STEP 2: ArmorIQ Plan Capture & Hashing
    const planCapture = armorIQService.capturePlan(
      'gpt-4o',
      userPrompt,
      plan,
      { customerEmail, agentId: this.agentId }
    );

    // STEP 3: Cryptographic Intent Token Generation
    const intentToken = await armorIQService.getIntentToken(planCapture, customerEmail);

    // STEP 4: Step-by-Step Tool Execution Governed by ArmorIQ
    const executedSteps = [];
    let halted = false;
    let finalVerdict = 'ALLOWED';
    let blockDetails = null;

    for (const step of plan.steps) {
      if (halted) break;

      // ArmorIQ Runtime Enforcement Chokepoint
      const enforcementResult = await armorIQService.enforceAndInvoke({
        toolName: step.action,
        toolArgs: step.params,
        intentToken,
        intentPlan: plan,
        userEmail: customerEmail
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

    // STEP 5: Construct Natural Language Agent Response
    let agentResponseText = '';
    if (finalVerdict === 'BLOCKED') {
      if (blockDetails.matchedRule === 'DENIED_TOOL_GUARD') {
        agentResponseText = `🛑 **Security Intercept**: I cannot fulfill your request to export system data or alter administrative configurations. This action was blocked by **ArmorIQ Runtime Security** (Rule: \`${blockDetails.matchedRule}\`). This incident has been logged to the security audit trail.`;
      } else if (blockDetails.matchedRule === 'MAX_REFUND_THRESHOLD_EXCEEDED') {
        const threshold = 50.00;
        agentResponseText = `⚠️ **Policy Limit Reached**: The requested refund amount exceeds our autonomous authorization limit of **$${threshold.toFixed(2)}**. This transaction was intercepted and blocked by **ArmorIQ Policy Governance** (Rule: \`${blockDetails.matchedRule}\`). A supervisor escalation ticket has been created for human review.`;
      } else if (blockDetails.matchedRule === 'UNAUTHORIZED_INTENT_DRIFT') {
        agentResponseText = `🛑 **Intent Drift Prevented**: ArmorIQ detected an unauthorized tool call that deviated from the cryptographically approved execution plan. The tool execution was halted.`;
      } else {
        agentResponseText = `🛑 **Action Blocked**: ArmorIQ policy enforcement denied this request: ${blockDetails.reason}`;
      }
    } else {
      const refundStep = executedSteps.find(s => s.action === 'issue_refund');
      const addressStep = executedSteps.find(s => s.action === 'update_shipping_address');
      const lookupStep = executedSteps.find(s => s.action === 'lookup_order');

      if (refundStep && refundStep.toolResult?.success) {
        agentResponseText = `✅ **Refund Approved & Processed**: I have verified your order **${refundStep.params.order_id}** and issued a refund of **$${Number(refundStep.params.amount).toFixed(2)}** back to your original payment method. Transaction ID: \`${refundStep.toolResult.transaction_id}\`. This action was verified and approved by **ArmorIQ Intent Governance**.`;
      } else if (addressStep && addressStep.toolResult?.success) {
        agentResponseText = `✅ **Shipping Address Updated**: Your delivery destination for order **${addressStep.params.order_id}** has been updated to: *${addressStep.params.new_address}*.`;
      } else if (lookupStep && lookupStep.toolResult?.found) {
        const o = lookupStep.toolResult.order;
        agentResponseText = `📦 **Order Status for ${o.id}**: Status is currently **${o.status.toUpperCase()}**. Total: $${o.total.toFixed(2)} (${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}). Delivered to: ${o.shipping_address}.`;
      } else {
        agentResponseText = `Your request was processed and validated within policy guidelines.`;
      }
    }

    return {
      agentResponse: agentResponseText,
      verdict: finalVerdict,
      reasoningGoal: plan.goal,
      intentSummary: plan.intentSummary,
      planCapture,
      intentToken,
      executedSteps,
      blockDetails,
      totalDurationMs: Date.now() - startTime
    };
  }
}

module.exports = new CustomerSupportAgent();

/**
 * Enterprise IT Helpdesk & IAM Admin Tools for Model Context Protocol (MCP) Server
 */

const db = require('../data/mockDb');

const TOOLS_DEFINITIONS = [
  {
    name: 'verify_employee_identity',
    description: 'Verify employee credentials, corporate email, department, and directory status.',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Corporate employee email address'
        }
      },
      required: ['email']
    },
    riskLevel: 'LOW (READ-ONLY LOOKUP)',
    execute: async ({ email }) => {
      return db.verifyEmployee(email);
    }
  },
  {
    name: 'reset_user_password',
    description: 'Issue a secure temporary reset token for an employee whose account is locked or password expired.',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Employee corporate email'
        },
        reason: {
          type: 'string',
          description: 'Reason for password reset'
        }
      },
      required: ['email']
    },
    riskLevel: 'MEDIUM (STANDARD SELF-SERVICE ACTION)',
    execute: async ({ email, reason }) => {
      return db.resetPassword(email, reason);
    }
  },
  {
    name: 'check_ticket_status',
    description: 'Lookup pending IT helpdesk tickets and SLA resolution status for an employee.',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Employee email address'
        }
      },
      required: ['email']
    },
    riskLevel: 'LOW (READ-ONLY)',
    execute: async ({ email }) => {
      const tickets = db.getTickets().filter(t => t.employeeEmail.toLowerCase() === email.toLowerCase());
      return { found: tickets.length > 0, tickets };
    }
  },
  {
    name: 'grant_admin_privileges',
    description: 'HIGH-PRIVILEGE ADMIN ACTION: Escalate an employee role to Global Administrator or Production Root.',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Target employee email'
        },
        role: {
          type: 'string',
          description: 'Elevated role requested (e.g. global_administrator, aws_root_access)'
        },
        target_cluster: {
          type: 'string',
          description: 'Target cloud cluster or infrastructure tier'
        }
      },
      required: ['email', 'role']
    },
    riskLevel: 'CRITICAL (PRIVILEGE ESCALATION ATTACK VECTOR)',
    execute: async ({ email, role, target_cluster }) => {
      return db.grantAdminAccess(email, role, target_cluster);
    }
  },
  {
    name: 'disable_mfa_enforcement',
    description: 'HIGH-PRIVILEGE SECURITY OVERRIDE: Disable multi-factor authentication enforcement on employee account.',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Employee email'
        }
      },
      required: ['email']
    },
    riskLevel: 'CRITICAL (AUTHENTICATION BYPASS)',
    execute: async ({ email }) => {
      return db.disableMfa(email);
    }
  },
  {
    name: 'unlock_third_party_account',
    description: 'HIGH-RISK PROXY ACTION: Unlock or reset an account on behalf of a colleague, coworker, or third party.',
    inputSchema: {
      type: 'object',
      properties: {
        caller: {
          type: 'string',
          description: 'Caller employee email'
        },
        target: {
          type: 'string',
          description: 'Target friend or colleague account identifier'
        }
      },
      required: ['caller']
    },
    riskLevel: 'CRITICAL (THIRD-PARTY SOCIAL ENGINEERING VECTOR)',
    execute: async () => {
      throw new Error('Action prohibited: Third-party account unlocks are forbidden.');
    }
  }
];

module.exports = {
  TOOLS_DEFINITIONS,
  executeTool: async (toolName, params) => {
    const tool = TOOLS_DEFINITIONS.find(t => t.name === toolName);
    if (!tool) {
      throw new Error(`Tool '${toolName}' is not registered on this IT Helpdesk MCP server.`);
    }
    return tool.execute(params || {});
  }
};

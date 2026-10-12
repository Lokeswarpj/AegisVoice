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

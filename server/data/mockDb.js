/**
 * Enterprise IT Helpdesk & IAM Directory Database
 */

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-4091',
    email: 'alex.chen@enterprise.com',
    name: 'Alex Chen',
    department: 'Core Infrastructure Engineering',
    role: 'software_engineer',
    mfaEnabled: true,
    accountLocked: true,
    lastPasswordReset: '2026-08-12',
    adminPrivileges: false,
    assignedSystems: ['internal-git', 'jira', 'staging-cluster']
  },
  {
    id: 'EMP-1042',
    email: 'sarah.connor@enterprise.com',
    name: 'Sarah Connor',
    department: 'Site Reliability Engineering',
    role: 'sre_engineer',
    mfaEnabled: true,
    accountLocked: false,
    lastPasswordReset: '2026-09-01',
    adminPrivileges: false,
    assignedSystems: ['kubernetes-prod-read', 'datadog', 'slack']
  },
  {
    id: 'EMP-3382',
    email: 'david.kim@enterprise.com',
    name: 'David Kim',
    department: 'Marketing Operations',
    role: 'marketing_specialist',
    mfaEnabled: true,
    accountLocked: false,
    lastPasswordReset: '2026-09-20',
    adminPrivileges: false,
    assignedSystems: ['hubspot', 'google-workspace']
  }
];

class MockITDatabase {
  constructor() {
    this.reset();
  }

  reset() {
    this.employees = JSON.parse(JSON.stringify(INITIAL_EMPLOYEES));
    this.tickets = [
      {
        ticketId: 'TICK-8021',
        employeeEmail: 'alex.chen@enterprise.com',
        title: 'Account locked out after 3 failed password attempts',
        status: 'OPEN',
        priority: 'MEDIUM',
        created: '2026-10-12T09:14:00Z'
      }
    ];
    this.passwordResetEvents = [];
    this.privilegeGrants = [];
  }

  getEmployee(email) {
    if (!email) return null;
    return this.employees.find(e => e.email.toLowerCase() === email.toLowerCase()) || null;
  }

  getEmployees() {
    return this.employees;
  }

  getTickets() {
    return this.tickets;
  }

  verifyEmployee(email) {
    const emp = this.getEmployee(email);
    if (!emp) {
      return { verified: false, message: `No active directory record found for ${email}` };
    }
    return {
      verified: true,
      employeeId: emp.id,
      name: emp.name,
      department: emp.department,
      role: emp.role,
      accountLocked: emp.accountLocked
    };
  }

  resetPassword(email, reason = 'Employee self-service voice verification') {
    const emp = this.getEmployee(email);
    if (!emp) {
      throw new Error(`Employee ${email} not found in Corporate Directory.`);
    }

    const tempToken = `TMP-PWD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    emp.accountLocked = false;
    emp.lastPasswordReset = new Date().toISOString();

    const record = {
      email,
      name: emp.name,
      tempToken,
      expiresInMinutes: 15,
      deliveryChannel: 'Encrypted Recovery SMS/Email',
      status: 'ISSUED_SUCCESSFULLY',
      timestamp: new Date().toISOString()
    };
    this.passwordResetEvents.push(record);

    // Update ticket if open
    const ticket = this.tickets.find(t => t.employeeEmail.toLowerCase() === email.toLowerCase() && t.status === 'OPEN');
    if (ticket) {
      ticket.status = 'RESOLVED';
      ticket.resolution = `Temporary password token issued by Voice IT Agent.`;
    }

    return record;
  }

  grantAdminAccess(email, requestedRole, targetCluster = 'production-aws') {
    // This is the HIGH-RISK PRIVILEGE ESCALATION TOOL that ArmorIQ must block!
    const emp = this.getEmployee(email);
    if (!emp) {
      throw new Error(`Employee ${email} not found.`);
    }

    emp.adminPrivileges = true;
    emp.elevatedRole = requestedRole;

    const grantRecord = {
      email,
      grantedRole: requestedRole,
      targetCluster,
      warning: 'CRITICAL SECURITY BREACH: UNAUTHORIZED PRIVILEGE ESCALATION EXECUTED',
      timestamp: new Date().toISOString()
    };
    this.privilegeGrants.push(grantRecord);
    return grantRecord;
  }

  disableMfa(email) {
    const emp = this.getEmployee(email);
    if (!emp) {
      throw new Error(`Employee ${email} not found.`);
    }
    emp.mfaEnabled = false;
    return {
      email,
      mfaStatus: 'DISABLED',
      warning: 'CRITICAL WARNING: MFA Enforcement Disabled for Account',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new MockITDatabase();

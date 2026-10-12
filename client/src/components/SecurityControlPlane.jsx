import React, { useState } from 'react';
import { Shield, Lock, FileKey, CheckCircle2, XCircle, AlertOctagon, Terminal, Activity, Layers, Hash } from 'lucide-react';

export default function SecurityControlPlane({ latestResult, auditLogs, policies, status }) {
  const [activeTab, setActiveTab] = useState('token'); // 'token' | 'policy' | 'mcp' | 'audit'

  const verdict = latestResult?.verdict || 'READY';
  const isBlocked = verdict === 'BLOCKED';
  const isAllowed = verdict === 'ALLOWED';

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
      {/* Top Banner: ArmorIQ Control Plane Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} color="#8B5CF6" />
          <span style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#FFFFFF' }}>
            ArmorIQ Runtime Security
          </span>
          <span className="mono-tag" style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.2)', color: '#DDD6FE' }}>
            CSRG-IAP
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Organization:</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#E2E8F0' }}>Lokeswar PJ's Workspace</span>
          </div>
          <a
            href={latestResult?.armorIqDashboardUrl || 'https://platform.armoriq.ai/dashboard/plans'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'rgba(139, 92, 246, 0.25)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              color: '#DDD6FE',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Control Plane ↗</span>
          </a>
        </div>
      </div>

      {/* Main Verdict Card */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: isBlocked ? 'rgba(239, 68, 68, 0.08)' : isAllowed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
            Policy Sentry Verdict:
          </span>
          <span className="mono-tag" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            Latency: {latestResult?.totalDurationMs ? `${latestResult.totalDurationMs}ms` : '0ms'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            className={isBlocked ? 'badge-blocked' : isAllowed ? 'badge-allowed' : ''}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.02em',
              background: !isAllowed && !isBlocked ? 'rgba(255,255,255,0.05)' : undefined,
              color: !isAllowed && !isBlocked ? 'var(--text-muted)' : undefined,
              border: !isAllowed && !isBlocked ? '1px solid var(--border-subtle)' : undefined
            }}
          >
            {isBlocked && <AlertOctagon size={18} />}
            {isAllowed && <CheckCircle2 size={18} />}
            {!isAllowed && !isBlocked && <Shield size={18} />}
            <span>
              {isBlocked ? 'ACTION BLOCKED (403)' : isAllowed ? 'ACTION ALLOWED (200)' : 'AWAITING CALL'}
            </span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isBlocked ? latestResult.blockDetails?.matchedRule : isAllowed ? 'All Zero-Trust IAM Checks Passed' : 'Ready to evaluate voice command'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isBlocked ? latestResult.blockDetails?.reason : isAllowed ? 'Tool call executed securely on it-helpdesk-mcp' : 'Awaiting tool call invocation'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.15)' }}>
        {[
          { id: 'token', label: 'Intent Token', icon: FileKey },
          { id: 'policy', label: 'IAM Policy', icon: Lock },
          { id: 'mcp', label: 'MCP Wiretap', icon: Terminal },
          { id: 'audit', label: 'SOC Audit', icon: Activity }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '10px 8px',
                background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--purple-armoriq)' : '2px solid transparent',
                color: isActive ? '#C4B5FD' : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* TAB 1: Cryptographic Intent Token */}
        {activeTab === 'token' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              ArmorIQ mints a tamper-proof cryptographic token binding the agent's explicit execution plan to user scope before tool execution.
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-subtle)', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Token ID</span>
                <span className="mono-tag" style={{ color: 'var(--purple-armoriq)', fontWeight: 600 }}>
                  {latestResult?.intentToken?.tokenId || 'tok_iap_waiting_for_invocation'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Algorithm</span>
                <span className="mono-tag" style={{ color: '#E2E8F0' }}>
                  {latestResult?.intentToken?.algorithm || 'Ed25519 (CSRG-IAP / Merkle Intent)'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Target MCP</span>
                <span className="mono-tag" style={{ color: '#38BDF8' }}>
                  {latestResult?.intentToken?.mcpTarget || 'it-helpdesk-mcp'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>HITL Status</span>
                <span className="mono-tag" style={{ color: isBlocked ? '#FCA5A5' : isAllowed ? '#6EE7B7' : '#C4B5FD', fontWeight: 700 }}>
                  {latestResult?.hitlStatus || (isBlocked ? 'POLICY_BLOCKED' : isAllowed ? 'HELD_ACTION_NEEDS_REVIEW' : 'AWAITING_CALL')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Control Plane Trace</span>
                <a
                  href={latestResult?.armorIqDashboardUrl || 'https://platform.armoriq.ai/dashboard/plans'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#38BDF8', fontSize: '0.72rem', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Open Plan in ArmorIQ ↗
                </a>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Plan Hash (SHA-256)</span>
                <span className="mono-tag" style={{ color: '#FCD34D', fontSize: '0.68rem', wordBreak: 'break-all' }}>
                  {latestResult?.intentToken?.planHash ? `${latestResult.intentToken.planHash.substring(0, 24)}...` : 'sha256:pending_hash'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Signature</span>
                <span className="mono-tag" style={{ color: '#93C5FD', fontSize: '0.68rem' }}>
                  {latestResult?.intentToken?.signature || 'EdDSA Signature verified'}
                </span>
              </div>
            </div>

            {/* Structured Execution Plan Preview */}
            {latestResult?.planCapture?.plan && (
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Captured Execution Plan Steps:
                </span>
                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {latestResult.planCapture.plan.steps?.map((step, idx) => (
                    <div key={idx} style={{ padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, color: '#A5B4FC' }}>Step {step.stepIndex}: {step.action}</span>
                        <span className="mono-tag" style={{ color: 'var(--text-dim)' }}>mcp: {step.mcp}</span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{step.rationale}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: IAM Governance Policies */}
        {activeTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-subtle)', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Active Policy ID</span>
                <span className="mono-tag" style={{ color: '#A78BFA', fontWeight: 700 }}>POL-IAM-GOV-01</span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '4px' }}>
                it_helpdesk_security_governance
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {policies?.description || 'Enforces least-privilege boundary: permits routine self-service while blocking autonomous privilege escalation.'}
              </div>
            </div>

            {/* Allowed Tools Allowlist */}
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--emerald-allow)', textTransform: 'uppercase', fontWeight: 700 }}>
                ✓ Permitted Self-Service Tools:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {policies?.rules?.allowedTools?.map((tool, idx) => (
                  <span key={idx} className="mono-tag" style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#6EE7B7', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Denied Tools */}
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--red-block)', textTransform: 'uppercase', fontWeight: 700 }}>
                ✕ Denied / High-Risk Admin Operations:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {policies?.rules?.deniedTools?.map((tool, idx) => (
                  <span key={idx} className="mono-tag" style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Escalation Rules */}
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', fontSize: '0.72rem', color: '#FDE68A', lineHeight: 1.5 }}>
              ⚠️ <strong>CAB Mandatory Escalation</strong>: Global Administrator or Root role escalation requests cannot be processed by autonomous AI agents and require human Change Advisory Board review.
            </div>
          </div>
        )}

        {/* TAB 3: MCP Server Wiretap */}
        {activeTab === 'mcp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              MCP server: <strong style={{ color: '#38BDF8' }}>it-helpdesk-mcp</strong> running on protocol version 1.0.0
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px solid var(--border-subtle)', padding: '12px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Last Intercepted MCP Invocation:
              </span>
              <pre className="mono-tag" style={{ marginTop: '8px', fontSize: '0.72rem', color: '#93C5FD', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                {latestResult?.executedSteps && latestResult.executedSteps.length > 0 ? (
                  JSON.stringify(
                    {
                      mcp_server: 'it-helpdesk-mcp',
                      invocations: latestResult.executedSteps.map(s => ({
                        tool: s.action,
                        parameters: s.params,
                        armoriq_enforcement: s.verdict,
                        executed_on_mcp: s.mcpExecuted
                      }))
                    },
                    null,
                    2
                  )
                ) : (
                  '// No tool calls intercepted yet. Run a scenario to see the MCP wiretap payload.'
                )}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: SOC Audit Trail */}
        {activeTab === 'audit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Immutable audit stream recorded to ArmorIQ Control Plane:
            </div>

            {auditLogs && auditLogs.length > 0 ? (
              auditLogs.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: log.verdict === 'BLOCKED' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                    border: log.verdict === 'BLOCKED' ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(16, 185, 129, 0.25)',
                    fontSize: '0.72rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span className="mono-tag" style={{ fontWeight: 700, color: log.verdict === 'BLOCKED' ? '#FCA5A5' : '#6EE7B7' }}>
                      [{log.verdict}] {log.toolName}
                    </span>
                    <span className="mono-tag" style={{ color: 'var(--text-dim)', fontSize: '0.65rem' }}>
                      {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : ''}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', lineHeight: 1.3 }}>
                    {log.reason}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                No audit events recorded in this session yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

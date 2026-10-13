/**
 * Express Server for AegisVoice IT Helpdesk & ArmorIQ Security Control Plane
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const voiceAgent = require('./agent/itHelpdeskAgent');
const armorIQService = require('./armoriq/client');
const policyEngine = require('./armoriq/policies');
const auditLogger = require('./armoriq/auditLogger');
const elevenLabsService = require('./elevenlabs/tts');
const mcpServer = require('./mcp/server');
const db = require('./data/mockDb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root endpoint: AegisVoice Backend Overview
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>AegisVoice Backend API</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0e17; color: #e2e8f0; margin: 0; padding: 40px; }
        .card { max-width: 650px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        h1 { color: #38bdf8; margin-top: 0; display: flex; align-items: center; gap: 10px; font-size: 24px; }
        p { color: #94a3b8; line-height: 1.6; }
        .btn { display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 16px 0; transition: background 0.2s; }
        .btn:hover { background: #1d4ed8; }
        .badge { background: #059669; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        ul { list-style: none; padding: 0; margin-top: 20px; }
        li { padding: 10px 14px; background: #0f172a; margin-bottom: 8px; border-radius: 6px; border: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; }
        a.api-link { color: #38bdf8; text-decoration: none; font-family: monospace; font-size: 14px; }
        a.api-link:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🛡️ AegisVoice IT Helpdesk Server <span class="badge">ONLINE</span></h1>
        <p>You have reached the backend API server (port 5000). The interactive web application user interface runs on port 5173.</p>
        <a class="btn" href="http://localhost:5173" target="_blank">🚀 Open Web App (http://localhost:5173)</a>
        
        <h3 style="color:#cbd5e1; margin-top: 24px;">Available API Endpoints:</h3>
        <ul>
          <li><span>System Status:</span> <a class="api-link" href="/api/status">/api/status</a></li>
          <li><span>Security Policies:</span> <a class="api-link" href="/api/policies">/api/policies</a></li>
          <li><span>Audit Logs:</span> <a class="api-link" href="/api/audit-logs">/api/audit-logs</a></li>
          <li><span>Sandbox Directory:</span> <a class="api-link" href="/api/employees">/api/employees</a></li>
          <li><span>MCP Tools Registry:</span> <a class="api-link" href="/api/mcp/tools">/api/mcp/tools</a></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// 1. Voice Agent Interaction Endpoint
app.post('/api/voice-agent', async (req, res) => {
  try {
    const { message, employeeEmail } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message / spoken text is required.' });
    }

    const result = await voiceAgent.processVoiceRequest(
      message,
      employeeEmail || 'alex.chen@enterprise.com'
    );

    res.json(result);
  } catch (err) {
    console.error('Voice agent execution error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Alias for chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, employeeEmail } = req.body;
    const result = await voiceAgent.processVoiceRequest(
      message,
      employeeEmail || 'alex.chen@enterprise.com'
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Direct ElevenLabs TTS Synthesis
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS synthesis.' });
    }
    const result = await elevenLabsService.synthesizeSpeech(text, voiceId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. System & ArmorIQ Status
app.get('/api/status', (req, res) => {
  const armorStatus = armorIQService.getStatus();
  res.json({
    ...armorStatus,
    elevenLabsConfigured: elevenLabsService.isConfigured(),
    defaultVoiceId: process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM',
    activeMcp: 'it-helpdesk-mcp'
  });
});

// 4. Update Credentials Dynamically
app.post('/api/update-keys', (req, res) => {
  const { armoriqApiKey, elevenlabsApiKey } = req.body;
  if (armoriqApiKey) {
    armorIQService.setApiKey(armoriqApiKey);
  }
  if (elevenlabsApiKey) {
    elevenLabsService.setApiKey(elevenlabsApiKey);
  }
  res.json({
    message: 'Credentials updated successfully.',
    armorIqStatus: armorIQService.getStatus(),
    elevenLabsConfigured: elevenLabsService.isConfigured()
  });
});

// 5. Policy Rules Management
app.get('/api/policies', (req, res) => {
  res.json(policyEngine.getPolicy());
});

app.post('/api/policies', (req, res) => {
  const { rules } = req.body;
  if (!rules) {
    return res.status(400).json({ error: 'Rules object is required.' });
  }
  const updated = policyEngine.updateRules(rules);
  res.json({ message: 'Policy rules updated.', policy: updated });
});

// 6. Security Audit Trail
app.get('/api/audit-logs', (req, res) => {
  res.json({ logs: auditLogger.getLogs() });
});

// 7. Active Directory Employee Sandbox Records
app.get('/api/employees', (req, res) => {
  res.json({
    employees: db.getEmployees(),
    tickets: db.getTickets()
  });
});

// 8. MCP Tools Registry (REST API)
app.get('/api/mcp/tools', (req, res) => {
  res.json({
    mcpServer: 'it-helpdesk-mcp',
    tools: mcpServer.getTools()
  });
});

// 9. Standard MCP JSON-RPC 2.0 Endpoint (for ArmorIQ CLI & Proxy Discovery)
app.post('/mcp', (req, res) => {
  const { jsonrpc, method, id, params } = req.body || {};

  if (method === 'initialize') {
    return res.json({
      jsonrpc: '2.0',
      id: id || 1,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'it-helpdesk-mcp', version: '1.0.0' }
      }
    });
  }

  if (method === 'tools/list' || method === 'tools/listTools') {
    return res.json({
      jsonrpc: '2.0',
      id: id || 2,
      result: {
        tools: mcpServer.getTools().map(t => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema
        }))
      }
    });
  }

  if (method === 'tools/call') {
    const { name, arguments: args } = params || {};
    try {
      const result = mcpServer.handleDirectCall(name, args);
      return res.json({
        jsonrpc: '2.0',
        id: id || 3,
        result: {
          content: [{ type: 'text', text: JSON.stringify(result) }]
        }
      });
    } catch (err) {
      return res.status(500).json({
        jsonrpc: '2.0',
        id: id || 3,
        error: { code: -32603, message: err.message }
      });
    }
  }

  res.json({ jsonrpc: '2.0', id: id || 1, result: {} });
});

// 10. Reset Sandbox State
app.post('/api/reset', (req, res) => {
  db.reset();
  auditLogger.clear();
  res.json({ message: 'IT sandbox directory and logs reset.' });
});

// Start Express Server (when run directly, not in Vercel serverless function)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🛡️  AegisVoice IT Helpdesk running on http://localhost:${PORT}`);
    console.log(`🎙️  ElevenLabs Voice Synthesis: READY`);
    console.log(`🔐  ArmorIQ Intent & Governance: ENABLED`);
    console.log(`📦  MCP Server: it-helpdesk-mcp initialized at /mcp`);
    console.log(`=======================================================`);
  });
}

module.exports = app;

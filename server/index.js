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

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🛡️  AegisVoice IT Helpdesk running on http://localhost:${PORT}`);
  console.log(`🎙️  ElevenLabs Voice Synthesis: READY`);
  console.log(`🔐  ArmorIQ Intent & Governance: ENABLED`);
  console.log(`📦  MCP Server: it-helpdesk-mcp initialized at /mcp`);
  console.log(`=======================================================`);
});

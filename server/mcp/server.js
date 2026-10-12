/**
 * Model Context Protocol (MCP) Server for Enterprise IT Helpdesk
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { TOOLS_DEFINITIONS, executeTool } = require('./tools');

class ItHelpdeskMcpServer {
  constructor() {
    this.name = 'it-helpdesk-mcp';
    this.version = '1.0.0';
    this.server = new Server(
      {
        name: this.name,
        version: this.version
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools for MCP consumers
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: TOOLS_DEFINITIONS.map(t => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema
        }))
      };
    });

    // Execute requested tool
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      try {
        const result = await executeTool(name, args);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      } catch (err) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Tool Execution Error: ${err.message}`
            }
          ]
        };
      }
    });
  }

  getTools() {
    return TOOLS_DEFINITIONS;
  }

  async handleDirectCall(toolName, params) {
    return executeTool(toolName, params);
  }
}

module.exports = new ItHelpdeskMcpServer();

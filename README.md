# Mem0 MCP Deployment
This repository deploys Mem0 as an MCP memory server on DigitalOcean App Platform, integrated with Kilo Code for persistent short- and long-term memory across multiple projects. The deployment includes an API service (FastAPI), a UI service (Next.js), a Qdrant vector database, and a PostgreSQL database, all configured for the fra1 region.

## Deploy to DigitalOcean
[![Deploy to DigitalOcean](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Sternberg-Corp-Projects/mem0/tree/main)

## Setup Instructions
- Click the Deploy to DigitalOcean button above to deploy using .do/deploy.template.yaml.
- In the DigitalOcean console, set the following environment variables on the api component:
  - OPENAI_API_KEY (Secret): your OpenAI API key.
  - QDRANT_URL (Secret): your managed Qdrant endpoint, e.g. https://YOUR-CLUSTER.qdrant.tech:6333
  - QDRANT_API_KEY (Secret): your Qdrant API key.
- After deployment, note the API URL (e.g., https://mem0-mcp-XXXX.ondigitalocean.app) and UI URL (/ui).

## Full Deployment Guide
- Fork the Repository: Fork https://github.com/mem0ai/mem0 to Sternberg-Corp-Projects/mem0.
- Deploy: Use the deploy button or manually deploy via the DigitalOcean console with .do/app.yaml.
- Kilo Code Setup: Install the Kilo Code extension in VS Code and configure the MCP server.
- Memory Management: Set up project briefs and memory rules for persistent storage.

## Testing
- API: curl https://mem0-mcp-XXXX.ondigitalocean.app/mcp/messages
- UI: Visit https://mem0-mcp-XXXX.ondigitalocean.app/ui
- Logs: Check the DigitalOcean console (Apps > Console) for deployment logs.

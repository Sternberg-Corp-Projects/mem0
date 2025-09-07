Mem0 MCP Deployment
This repository deploys Mem0 as an MCP memory server on DigitalOcean App Platform, integrated with Kilo Code for persistent short- and long-term memory across multiple projects. The deployment includes an API service (FastAPI), a UI service (Next.js), a Qdrant vector database, and a PostgreSQL database, all configured for the fra1 region.
Deploy to DigitalOcean
[!Deploy to DigitalOcean](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Sternberg-Corp-Projects/mem0/tree/main)
Setup Instructions
Click the Deploy to DigitalOcean button above to deploy using .do/deploy.template.yaml.
In the DigitalOcean console, set the OPENAI_API_KEY environment variable:
Go to Components > api > Settings > Environment Variables.
Add OPENAI_API_KEY with your key (e.g., sk-... from https://openai.com).
After deployment, note the API URL (e.g., https://mem0-mcp-XXXX.ondigitalocean.app) and UI URL (/ui).
Follow the full guide below for configuring Kilo Code and setting up project memory.
Full Deployment Guide
Fork the Repository: Fork https://github.com/mem0ai/mem0 to Sternberg-Corp-Projects/mem0.
Deploy: Use the deploy button or manually deploy via the DigitalOcean console with .do/app.yaml.
Kilo Code Setup: Install the Kilo Code extension in VS Code and configure the MCP server.
Memory Management: Set up project briefs and memory rules for persistent storage.
For detailed steps, refer to the full deployment guide (update with your preferred link or documentation).
Testing
API: curl https://mem0-mcp-XXXX.ondigitalocean.app/mcp/messages
UI: Visit https://mem0-mcp-XXXX.ondigitalocean.app/ui
Logs: Check the DigitalOcean console (Apps > Console) for deployment logs.

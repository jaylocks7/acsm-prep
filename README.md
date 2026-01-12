# ACSM Prep - Code Analysis Tool

AI-powered code review tool built as a learning project. This repository contains a multi-step project building from TypeScript + Express API to a full-stack application with Claude API integration.

## Development

### Running in Development Mode
```bash
npm run dev
```
- Runs TypeScript directly using `ts-node`
- Auto-restarts on file changes with `nodemon`
- No build step required

### Production/Deployment

```bash
npm run build    # Compile TypeScript to JavaScript
npm start        # Run the compiled application
```
- Compiles TypeScript to JavaScript in the `build/` folder
- Runs the optimized compiled code

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run TSLint on source files
- `npm test` - Run tests

## Overview

This project demonstrates a modern AI-integrated development workflow:

1. **Web Interface** - React frontend for submitting code and viewing analysis results
2. **API Server** - Express/TypeScript backend handling requests and orchestrating analysis
3. **LLM Integration** - Claude API with hooks for observability, caching, and control
4. **MCP Server** - Model Context Protocol server exposing analysis tools to AI coding assistants

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  React Frontend │────▶│  Express API    │────▶│  Claude API     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   MCP Server    │
                        │  (analyze_code) │
                        └─────────────────┘
                               ▲
                               │
                        ┌─────────────────┐
                        │  Claude Code /  │
                        │  Claude Desktop │
                        └─────────────────┘
```

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Express, TypeScript
- **AI:** Claude API (Anthropic SDK), Claude Hooks
- **Protocol:** Model Context Protocol (MCP)
- **Infrastructure:** Docker, Terraform, AWS ECS

## Projects

This repo is built incrementally across several mini-projects:

| Project | Description |
|---------|-------------|
| 1 | Express/TypeScript API with basic static analysis |
| 2 | React frontend |
| 3 | Claude API integration with hooks pattern |
| 4 | MCP server exposing analysis tools |
| 5 | MCP client integration in Express backend |
| 6 | Docker containerization |
| 7 | Terraform/AWS ECS infrastructure |
| 8 | Eval framework for LLM accuracy |

## Key Concepts Demonstrated

- **Hooks Pattern** - Middleware layer around LLM calls for logging, validation, and security rule injection
- **MCP Integration** - Exposing tools to AI assistants via standardized protocol
- **Full-Stack TypeScript** - End-to-end type safety from frontend to backend
- **Production Patterns** - Error handling, Docker, infrastructure as code
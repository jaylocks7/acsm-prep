# Project 1: TypeScript + Express API Foundation

## Context
I'm building an AI-powered code review tool as a learning project. This is the first of several mini-projects that will build on each other. Later projects will add: React frontend, Claude API integration with hooks, and an MCP server.

## Goal
Create a simple Express API in TypeScript that accepts file paths and returns basic static analysis on the file contents.

## Requirements

**Endpoint:** `POST /analyze`

**Request body:**
```typescript
{
  filePath: string;  // relative to configured workspace directory
}
```

**Response:**
```typescript
{
  lineCount: number;
  functions: string[];        // detected function names
  imports: string[];          // detected imports
  issues: {
    line: number;
    message: string;
    severity: "info" | "warning" | "error";
  }[];
}
```

**Basic analysis to implement:**
- Count lines
- Extract function names (named functions and arrow functions)
- Extract import statements
- Flag simple issues: `console.log` statements, `any` type usage, empty catch blocks

## Technical Requirements
- TypeScript with `strict: true`
- Express with properly typed request/response
- Error handling middleware that returns consistent error shape
- Request validation (reject if `filePath` is missing or empty)
- Async error handling (don't crash on thrown errors)
- File path security:
  - Restrict file access to a configured workspace directory
  - Validate file extensions (.ts, .js only)
  - Configurable max file size limit
- Configuration:
  - Port configurable via environment variable (PORT)
  - Workspace directory configurable via config file
  - Max file size configurable via config file
- Package manager: npm

## Project Structure
```
/project-1
  /src
    index.ts
    /routes
      analyze.ts
    /services
      analyzer.ts
      fileReader.ts
    /types
      index.ts
    /middleware
      errorHandler.ts
    /config
      index.ts
  config.json
  .env.example
  tsconfig.json
  package.json
```

## Success Test

**Setup:**
1. Create a test file in your configured workspace directory: `test.ts`
   ```typescript
   import fs from "fs";

   function hello() {
     console.log("hi");
   }

   const greet = () => {
     try {
       // do something
     } catch(e) {}
   }
   ```

2. Configure workspace directory in `config.json`

**Test:**
```bash
curl -X POST http://localhost:PORT/analyze \
  -H "Content-Type: application/json" \
  -d '{"filePath": "test.ts"}'
```

**Expected response:**
- 2 functions detected (hello, greet)
- 1 import (fs)
- 2 issues: console.log statement, empty catch block

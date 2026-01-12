The type field in package.json determines how Node.js treats your JavaScript files.

Two options:

"type": "module" → Use ES Modules (ESM)

Import syntax: import express from 'express'
Export syntax: export const foo = ...
File extensions: .js files treated as ES modules
"type": "commonjs" (or omit the field entirely - this is the default)

Import syntax: const express = require('express')
Export syntax: module.exports = ...
Traditional Node.js module system
For your project:

Since you're using TypeScript, you'll write import/export syntax in your .ts files regardless. TypeScript will compile it to either ESM or CommonJS based on your tsconfig.json settings.

Recommendation: Use "type": "module" for modern Node.js (it's the future) and configure your tsconfig.json accordingly.

---

TS is superset of JS -> at compile TS enforces type safety and converts files to JS then executes

ONLY COMPILE CHECKS, NO RUNTIME CHECKS

1. Parse into Abstract Syntax Tree which structures code in way compiler can understand
2. Type checking
3. Generate JS files
4. Bundle
5. Execution

---

QUESTIONS:
-What are the differences between modules?
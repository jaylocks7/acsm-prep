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
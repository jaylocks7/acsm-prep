import Database from 'better-sqlite3';

// Import the Better-SQLite3 module

// Create a connection to the database
const db: Database.Database = new Database('./analyses.db');

// Execute a query to create a table
db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filePath TEXT NOT NULL,
    result TEXT NOT NULL,  -- JSON string of analysis result
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
)
`);

// Export the db instance for use in other modules
export default db;

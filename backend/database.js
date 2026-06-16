const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, 'meetings.db')
);

db.serialize(() => {

  db.run(`
    
    CREATE TABLE IF NOT EXISTS meetings (
    
      id TEXT PRIMARY KEY,
      email TEXT,
      meetingLink TEXT,
      status TEXT,
      transcriptPath TEXT,
      summaryPath TEXT,
      createdAt TEXT
    
    )
  
  `);

});

module.exports = db;
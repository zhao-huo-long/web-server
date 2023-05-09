const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database('foobar.db', { verbose: console.log });
const sqlPath = path.resolve(__dirname, 'create.sql');

db.exec(fs.readFileSync(sqlPath).toString('utf8'));


const insertLog = db.prepare(`INSERT INTO website_view_log (session_id, ip, created_at) VALUES (@sessionId, @ip, datetime(CURRENT_TIMESTAMP, 'localtime'))`);

module.exports = {
  insertLog(data) {
    return insertLog.run(data)
  }
}
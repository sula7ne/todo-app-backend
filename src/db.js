import { DatabaseSync } from "node:sqlite"
const db = new DatabaseSync(':memory:');

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )
`);

db.exec(`
    CREATE TABLE todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task text,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`);

export default db;
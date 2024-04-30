import {db} from './db.mjs';

await db.run('CREATE TABLE comments (id INTEGER PRIMARY KEY, text TEXT(100) NOT NULL)')
await db.run('CREATE TABLE statuses (id INTEGER PRIMARY KEY, text TEXT(100) NOT NULL)')
db.close();
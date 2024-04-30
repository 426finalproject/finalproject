import {db} from './db.mjs';

await db.run('DELETE FROM symptoms');
await db.run('DELETE FROM comments');

db.close();
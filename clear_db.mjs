import {db} from './db.mjs';

await db.run('DELETE FROM statuses');
await db.run('DELETE FROM comments');

db.close();
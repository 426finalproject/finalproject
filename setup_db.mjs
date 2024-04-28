import {db} from './db.mjs';

// Use the db object to run table creation commands and otherwise initialize your database setup here.
await db.run('CREATE TABLE recipes (id INTEGER PRIMARY KEY, name TEXT(100) NOT NULL)');

await db.run('CREATE TABLE ingredients (id INTEGER PRIMARY KEY, name TEXT(100) NOT NULL)');

await db.run('CREATE TABLE steps (id INTEGER PRIMARY KEY, seq_no INTEGER NOT NULL, instruction TEXT, recipe_id INTEGER NOT NULL, ' +
           'FOREIGN KEY (recipe_id) REFERENCES recipes(id))');

await db.run('CREATE TABLE ingredient_step (ingredient_id INTEGER NOT NULL, step_id INTEGER NOT NULL, ' +
       'FOREIGN KEY (ingredient_id) REFERENCES ingredients(id), FOREIGN KEY (step_id) REFERENCES steps(id))');

db.close();

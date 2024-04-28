import {Database} from 'sqlite-async';

export let db = await Database.open('db.sqlite');

import {db} from './db.mjs';

export class Status {

    #id
    #text

    constructor (id, text) {
        this.#id = id;
        this.#text = text;
    }

    static async getText(id) {
        if (id < 0 || id > 4) {
            return null;
        }

        try {
            let status = await db.get('select * from statuses where id = ?', id);
            if (!status) {
                // If not found, return empty status
                return {
                    id: -1,
                    text: ''
                }
            }

            return {
                id: status.id,
                text: status.text
            }
        } catch(e) {
            return null;
        }
    }

    static async setText(id, text) {
        if (id < 0 || id > 4) {
            return null;
        }
        
        try {
            // If status already exists
            let status = await db.get('select * from statuses where id = ?', id);
            if (status) {
                return null;
            }

            // Create new status
            let db_result = await db.run('insert into statuses values (?, ?)', id, text);
            if (!db_result) {
                return null;
            }

            return {
                id: id,
                text: text
            }
        } catch (e) {
            return null;
        }
    }

    static async updateText(id, text) {
        if (id < 0 || id > 4) {
            return null;
        }
        
        try {
            await db.run('update statuses set text = ? where id = ?', text, id);
            return {
                id: id,
                text: text
            }
        } catch (e) {
            return null;
        }
    }
}

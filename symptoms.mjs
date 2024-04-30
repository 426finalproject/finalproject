import {db} from './db.mjs';

export class Symptom {

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
            let symptom = await db.get('select * from symptoms where id = ?', id);
            if (!symptom) {
                // If not found, return empty symptom
                return {
                    id: -1,
                    text: ''
                }
            }

            return {
                id: symptom.id,
                text: symptom.text
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
            // If symptom already exists
            let symptom = await db.get('select * from symptoms where id = ?', id);
            if (symptom) {
                return null;
            }

            // Create new symptom
            let db_result = await db.run('insert into symptoms values (?, ?)', id, text);
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
            await db.run('update symptoms set text = ? where id = ?', text, id);
            return {
                id: id,
                text: text
            }
        } catch (e) {
            return null;
        }
    }
}

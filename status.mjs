import {db} from './db.mjs';

export class Status {

    #id
    #text

    constructor (id, text) {
        this.#id = id;
        this.#text = text;
    }

    static async getText(id) {
        try{
            let status = await db.get('select text from statuses where id = ?', id);
            if (!status) {
                // If not found, return empty status
                return {
                    id: '',
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
        try {
            let db_result = await db.run('insert into statuses values (?, ?)', id, text);
            if (!db_result) {
                return null;
            }

            return {
                id: data.id,
                text: data.text
            }
        } catch (e) {
            return null;
        }
    }

    static async updateText(id, text) {
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

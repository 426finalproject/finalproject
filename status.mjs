import {db} from './db.mjs';

export class Status {

    #id
    #text

    constructor (id, text) {
        this.#id = id;
        this.#text = text;
    }

    static async setText(data){
        try {
            let db_result = await db.run('insert into statuses values (?, ?)', data.id, data.text);
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

    static async updateText(data){
        try {
            await db.run('update statuses set text = ? where id = ?', data.text, data.id);
        } 
        catch (e) {
            return false;
        }
        return true;

    }

    static async getText(id){
        try{
            let status = await db.get('select text from statuses where id = ?', id);

            if (!status) {
                return null;
            }

            return {
                id: data.id,
                text: status.text
            }

        } catch(e){
            return null;
        }

    }



}

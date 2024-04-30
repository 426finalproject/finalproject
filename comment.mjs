import {db} from './db.mjs';
export class Comment {

    #id
    #text

    constructor (id, text) {
        this.#id = id;
        this.#text = text;
    }

    static async create(data) {
        try {
            let db_result = await db.run('insert into comments values (NULL, ?)', data.text);
            if (!db_result) {
                return null;
            }

            return {
                id: db_result.lastID,
                text: data.text
            }
        } catch (e) {
            return null;
        }
    }

    static async getComments() {
        try {
            let all_comments = await db.all('select * from comments');
            if (!all_comments || all_comments.length === 0) {
                return null;
            }

            return all_comments.map(comment => {
                return {
                    id: comment.id,
                    text: comment.text,
                }
            });
        } catch (e) {
            return null;
        }
    }
    
    static async removeComment(id) {
        try {
            await db.run('delete from comments where id=?', id);
        } catch (e) {
            return false;
        }
        return true;
    }

}
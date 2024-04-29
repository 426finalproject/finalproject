import {db} from './db.mjs';
export class Comment {

    #id
    #name
    #comment

    constructor (id, name, comment) {
        this.#id = id;
        this.#name = name;
        this.#comment = comment;
    }

    static async create(data) {
        try {
            let db_result = await db.run('insert into comments values (NULL, ?, ?)', data.name, data.comment);
            if (!db_result) {
                return null;
            }

            return {
                id: db_result.lastID,
                name: data.name,
                comment: data.comment
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

            return all_comments.map(each_person => {
                return {
                    id: each_person.id,
                    name: each_person.name,
                    comment: each_person.comment
                }
            });
        } catch (e) {
            return null;
        }
    }
}
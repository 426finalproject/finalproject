import {db} from './db.mjs';
export class Comment {

    #id
    #name
    #comment

    static #nextId = 1;
    constructor (id, name, comment) {
        this.#id = id;
        this.#name = name;
        this.#comment = comment;
    }

    static async create(data) {
        try {
            let db_result = await db.run('insert into comments values (NULL, ?, ?)', data.name, data.comment);
            let step = new Comment(Comment.#nextId++, data.name, data.comment);
            return step;    
        } catch (e) {
            return null;
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from comments where id = ?', id);
            if (!row) {
                return null;
            } else {
                let all_id_comment = await db.all('select name, comment from comments where id = ?', id);
                let comments = all_id_comment.map(each_comment => new Comment(id, each_comment.name, each_comment.comment));
                return comments;
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
            } else {
                let comments = all_comments.map(each_person => new Comment(each_person.id, each_person.name, each_person.comment));
                return comments;
            }
        } catch (e) {
            return null;
        }
    }
    
    
    json() {
        return {
            id: this.getID(),
            name: this.getName(),
            comment: this.getComment(),
        }
    }


    getID(){
        return this.#id;   
    }
    getName(){
        return this.#name;      
    }
    getComment() {
        return this.#comment;
    }
}
import {db} from './db.mjs';
export class Comment {

    #id
    #name
    #comment

    static #nextId=1;
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
                let step_ing_rows = await db.all('select name,comment from comments where id = ?', id);
                let ingredient_ids = step_ing_rows.map(sir => sir.ingredient_id);                         // ???
                return new Step(row.id, row.seq_no, row.instruction, ingredient_ids);
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
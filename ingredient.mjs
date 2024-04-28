import {db} from './db.mjs';
export class Ingredient {

    #id
    #name

    constructor (id, name) {
        this.#id = id;
        this.#name = name;
    }

    static async create(data) {
        if ((data !== undefined) && (data instanceof Object) 
        && (data.name !== undefined) 
        && (typeof data.name == 'string')) {

            try {
                let db_result = await db.run('insert into ingredients values (NULL, ?)', data.name);
                let ing = new Ingredient(db_result.lastID, data.name);
                return ing;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getAllIDs() {
        try {
            let rows = await db.all('select id from ingredients');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from ingredients where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Ingredient(row.id, row.name);
            }
        } catch (e) {
            return null;
        }
    }

    static async deleteIngredientByID(id) {
        try {
            // First see if it is still in use. If so, return false.
            let ing_step_count = await db.get('select count(*) as count from ingredient_step where ingredient_id = ?', id);
            if (ing_step_count.count != 0) {
                return false;
            }
            await db.run('delete from ingredients where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    json() {
        return {
            id: this.#id,
            name: this.#name
        }
    }

    getID() {
        return this.#id;
    }

    async setName(new_name) {
        try {
            await db.run('update ingredients set name = ? where id = ?', this.#name, this.#id);
            this.#name = new_name;
            return true;
        } catch (e) {
            return false;
        }
    }
}
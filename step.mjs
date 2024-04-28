
import {db} from './db.mjs';
export class Step {

    #id
    #seq_no
    #instruction
    #ingredients

    constructor (id, seq_no, instruction, ingredients) {
        this.#id = id;
        this.#seq_no = seq_no;
        this.#instruction = instruction;
        this.#ingredients = [...ingredients];
    }

    static async create(data) {
        // Only used by Recipe which prevalidates the data.

        try {
            let db_result = await db.run('insert into steps values (NULL, ?, ?, ?)', data.seq_no, data.instruction, data.recipe_id);
            let step_id = db_result.lastID;
            for (let i=0; i<data.ingredients.length; i++) {
                let iid = data.ingredients[i];
                let db_result = await db.run('insert into ingredient_step values (?, ?)', iid, step_id);
            }
            let step = new Step(db_result.lastID, data.seq_no, data.instruction, data.ingredients);
            return step;    
        } catch (e) {
            return null;
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from steps where id = ?', id);
            if (!row) {
                return null;
            } else {
                let step_ing_rows = await db.all('select ingredient_id from ingredient_step where step_id = ?', id);
                let ingredient_ids = step_ing_rows.map(sir => sir.ingredient_id);
                return new Step(row.id, row.seq_no, row.instruction, ingredient_ids);
            }
        } catch (e) {
            return null;
        }
    }

    json() {
        return {
            id: this.#id,
            seq_no: this.#seq_no,
            instruction: this.#instruction,
            ingredients: this.getIngredientIDs()
        }
    }

    getIngredientIDs() {
        return [...this.#ingredients];
    }
}
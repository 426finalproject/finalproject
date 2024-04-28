import {db} from "./db.mjs";
import { Ingredient} from "./ingredient.mjs";
import {Step} from "./step.mjs";
export class Recipe {

    #id
    #name
    #steps

    constructor (id, name, steps) {
        this.#id = id;
        this.#name = name;
        this.#steps = steps;
    }

    static async create(data) {
        if ((data == undefined) || (!data instanceof Object) 
        || (data.name == undefined) 
        || (typeof data.name != 'string')) {
            return null;
        }

        if ((data.steps == undefined) || (! Array.isArray(data.steps))) {
            return null;
        }

        for (let i=0; i<data.steps.length; i++) {
            let s = data.steps[i];

            if (!s instanceof Object) {
                return null;
            }
            if (!s.seq_no) {
                return null;
            }
            if (typeof s.seq_no != 'number') {
                return null;
            }
            if (!s.instruction) {
                return null;
            }
            if (typeof s.instruction != 'string') {
                return null;
            }
            if (!s.ingredients) {
                return null;
            }
            if (!Array.isArray(s.ingredients)) {
                return null;
            }

            for (let i=0; i<s.ingredients.length; i++) {
                let iid = s.ingredients[i];
                if (! await Ingredient.findByID(iid)) {
                    return null;
                }
            }
        }

        let id;
        try {
            let db_result = await db.run('insert into recipes values (NULL, ?)', data.name);
            id = db_result.lastID;
        } catch (e) {
            return null;
        }

        // Make the steps.

        let steps = [];
        for (let i=0; i<data.steps.length; i++) {
            data.steps[i].recipe_id = id;
            steps.push(await Step.create(data.steps[i]));
        }

        let recipe = new Recipe(id, data.name, steps);
        return recipe;
    }

    static async getAllIDs() {
        try {
            let rows = await db.all('select id from recipes');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from recipes where id = ?', id);
            if (!row) {
                return null;
            }
            let name = row.name;
            // Need step objects.
            let step_ids = (await db.all('select id from steps where recipe_id = ?', id)).map(s => s.id);
            let steps = [];
            for (let i=0; i<step_ids.length; i++) {
                steps.push(await Step.findByID(step_ids[i]));
            }
            return new Recipe(id, name, steps);
        } catch (e) {
            return null;
        }
    }

    static async deleteRecipeByID(id) {
        try {
            // First delete the steps.
            await db.run('delete from steps where recipe_id = ?', id);

            // Then delete the recipe.
            await db.run('delete from recipes where id = ?', id);
        } catch (e) {
            return false;
        }
        return true;
    }

    async json(expanded) {
        let ingredient_ids = [];
        this.#steps.forEach((s) => {
            s.getIngredientIDs().forEach((iid) => {
                if (!ingredient_ids.includes(iid)) {
                    ingredient_ids.push(iid);
                }
            });
        });

        let recipe_json = {
            id: this.#id,
            name: this.#name,
        }

        if (expanded) {
            // Can't use Ingredient.findByID in map because it is async
            // recipe_json.ingredients = ingredient_ids.map((iid) => Ingredient.findByID(iid).json());

            recipe_json.ingredients = [];
            for (let i=0; i<ingredient_ids.length; i++) {
                let iid = ingredient_ids[i];
                recipe_json.ingredients.push((await Ingredient.findByID(iid)).json());
            }
            recipe_json.steps = this.#steps.map((s) => s.json());
        } else {
            recipe_json.ingredient_count = ingredient_ids.length;
            recipe_json.step_count = this.#steps.length;
        }
        return recipe_json;
    }

    getID() {
        return this.#id;
    }

    async setName(new_name) {
        try {
            await db.run('update recipes set name = ? where id = ?', new_name, this.getID());
            return true;
        } catch (e) {
            return false;
        }
    }
}
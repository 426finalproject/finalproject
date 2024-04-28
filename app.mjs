import express from 'express';
import bodyParser from 'body-parser';
import {Ingredient} from './ingredient.mjs';
import {Recipe} from './recipe.mjs';

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/ingredients', async (req, res) => {
    res.json(await Ingredient.getAllIDs());
});

app.get('/ingredients/:id', async (req, res) => {
    let ing = await Ingredient.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Ingredient not found");
        return;
    }
    res.json(ing.json());
});

app.post('/ingredients', async (req, res) => {

    let ing = await Ingredient.create(req.body);

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

app.put('/ingredients/:id', async (req, res) => {
    let ing = await Ingredient.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Ingredient not found.");
        return;
    }
    
    if ((!req.body instanceof Object) || (req.body.name == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    await ing.setName(req.body.name);
    res.json(true);
})

app.delete('/ingredients/:id', async (req, res) => {
    if (!await Ingredient.deleteIngredientByID(req.params.id)) {
        res.status(400).send("Ingredient is still in use");
        return;
    } 
    res.json(true);
})

app.get('/recipes', async (req, res) => {
    res.json(await Recipe.getAllIDs());
});

app.get('/recipes/:id', async (req, res) => {
    let recipe = await Recipe.findByID(req.params.id);
    if (!recipe) {
        res.status(404).send("Recipe not found");
        return;
    }

    res.json(await recipe.json(req.query.expanded != undefined));
});

app.post('/recipes', async (req, res) => {

    let recipe = await Recipe.create(req.body);

    if (!recipe) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(await recipe.json(true));
});

app.put('/recipes/:id', async (req, res) => {
    let recipe = await Recipe.findByID(req.params.id);
    if (!recipe) {
        res.status(404).send("Recipe not found.");
        return;
    }
    
    if ((!req.body instanceof Object) || (req.body.name == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    await recipe.setName(req.body.name);
    res.json(true);
});

app.delete('/recipes/:id', async (req, res) => {
    await Recipe.deleteRecipeByID(req.params.id);
    res.json(true);
});

await Ingredient.create({name: "chicken"});
await Ingredient.create({name: "lemon"});
await Ingredient.create({name: "wine"});
await Recipe.create({
    name: 'Chicken Picatta',
    steps: [
        {
            seq_no: 1,
            instruction: "Heat oil in pan",
            ingredients: []
        },
        {
            seq_no: 2,
            instruction: "Pan fry chicken cutlets",
            ingredients: [1]
        },
        {
            seq_no: 2,
            instruction: "Make lemon sauce",
            ingredients: [2,3]
        },
        {
            seq_no: 3,
            instruction: "Combine and serve",
            ingredients: [1,2,3]
        }
    ]
});

app.listen(port, () => {
    console.log('Running...');
})
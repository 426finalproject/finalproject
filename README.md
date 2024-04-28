# A05 Example Assignment

Use the command *npm install* in the terminal at the top-level of this repository to install express and other necessary modules.

Implement the following RESTful API to recipe information. If you want to use a database, a sqlite3 database is set up by importing the symbol *db* from db.mjs. Put any database setup (i.e., table creation, etc.) in setup_db.mjs and then run *node setup_db.mjs* to execute. The database will store data in the file *db.sqlite*.
To reset, simply remove that file and rerun the setup code.

I recommend using the sqlite-async module which is Promise-based and therefore capatible with async/await. Otherwise, you can store data in top-level module variables. This assignment is set up to use ES6 modules.

Start your backend with the command *node app.mjs* in the terminal or to debug select app.js in the folder explorer and then use the "Run and Debug" panel. Leave the port number at 3000.

### Retrieve index array of ingredient ids

    GET /ingredients

Returns a JSON array of ingredient ids.

### Retrieve ingredient by id

    GET /ingredients/{id}

On success, a JSON object for the ingredient identified by {id}. Includes fields *id* and *name*. 
Example:

    {
        "id": 902,
        "name": "chicken"
    }

### Create an ingredient

    POST /ingredients

On success, a JSON object for the newly created ingredient as would be returned if retrived by GET. 
Request body is expected to be JSON object with field *name* providing name of new ingredient. Any other fields are ignored. Generates 400 (Bad Request) response if no *name* field is provide or *name* field value is invalid.

### Update an ingredient

    PUT /ingredients/{id}

On success, returns JSON true value. Request body is expected to be JSON object with field *name* providing new name value for ingredient. Generates 404 if {id} does not identify an ingredient.

### Delete an ingredient

    DELETE /ingredients/{id}

On success, returns JSON true. Fails and generates a 400 response if any step of any recipe is still associated with the ingredient.

### Retrieve index array of recipe ids

    GET /recipes

Returns a JSON array of recipe ids.

### Retrieve recipe by id

    GET /recipes/{id}
    GET /recipes/{id}?expanded

On success, a JSON object for the recipe with id equal to {id}. Generates 404 response if no recipe with that id available. Generates 400 response if id is non-numeric or negative. 

When expanded parameter is not present, JSON
representation of recipe returned only include fields *id*, *name*, *ingredient_count*, and *step_count* providing the recipe id and name with number of ingredients and steps. 

When expanded parameter is present, JSON representation of recipe includes fields for id, name, ingredients, and steps. Ingredients is an array of ingredient JSON objects each with id and name fields. Steps is an array of step JSON objects each with fields id, seq_no, instruction, and ingredients. The ingredients field of a step is an array ingredient id values. The step JSON objects in the array will be ordered by seq_no which is numerical. Any ingredient id value associated with any step is guaranteed to be associated with an ingredient JSON object included in the ingredients array of the recipe. 

Example return without expanded parameter:

    {
        "id": 4,
        "name": "Chicken Piccata",
        "ingredient_count": 2,
        "step_count": 4
    }

Example return with expanded parameter:

    {
        "id": 4,
        "name": "Chicken Piccata",
        "ingredients": [
            {
                "id": 902,
                "name": "chicken"
            },
            {
                "id": 203,
                "name": "lemons"
            }
        ],
        "steps": [
            {
                "id": 242,
                "seq_no": 1,
                "instruction": "Heat oil in pan",
                "ingredients": []
            },
            {
                "id": 40,
                "seq_no": 2,
                "instruction": "Pan pry chicken cutlets dredged in flour",
                "ingredients": [902]
            },
            {
                "id": 243,
                "seq_no": 2,
                "instruction": "Make lemon sauce",
                "ingredients": [203]
            },
            {
                "id": 123,
                "seq_no": 3,
                "instruction": "Combine cutlets with sauce. Serve"
                "ingredients": [902, 203]
            }
        ]
    }

### Create recipe

    POST /recipes

Creates a new recipe using the data provided as a JSON object in the request body. If successful, generates a 201 (Created) response and returns the JSON representation of the new recipe. The Location header should contain the URL of the new resource suitable for GET.

The request data should be a JSON object with at least a *name* field with the name of the new recipe. Optionally a *steps* field can be included with an array of objects providing step information. Returns 400 if any data is invalid (e.g., ingredient id associated with any step is invalid, non-numerical seq_no data, missing or invalid name, etc.). 

Example request data to create a new recipe:

    {
        "name": "Chicken Piccata",
        "steps": [
            {
                "seq_no": 1,
                "instruction": "Heat oil in pan",
                "ingredients": []
            },
            {
                "seq_no": 2,
                "instruction": "Pan pry chicken cutlets dredged in flour",
                "ingredients": [902]
            },
            {
                "seq_no": 2,
                "instruction": "Make lemon sauce",
                "ingredients": [203]
            },
            {
                "seq_no": 3,
                "instruction": "Combine cutlets with sauce. Serve"
                "ingredients": [902, 203]
            }
        ]
    }

### Update recipe name

    PUT /recipes/{id}

On success, returns JSON true value. Request body is expected to be JSON object with field *name* providing new name value for recipe. Generates 404 if {id} does not identify a recipe.

### Delete recipe

    DELETE /recipes/{id}

Deletes recipe with id value {id}. Returns JSON true.
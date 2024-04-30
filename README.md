# Allergy Forecaster

For our final project, we wanted to create an Allergy Forecast Web Application. 

We used a 3rd party Google Maps Pollen API to retrieve 5 days of pollen data.
We also created our own Comment API and Symptoms API to to store and update user input on the pollen forecast in two databases.

Users can get a 5 day pollen forecast as well as get a more detailed allergy forecast for each of those 5 days. The more detailed report lists high allergens for that day and allows the user to record their symptoms.

The Comments Feed

## Google Maps Pollen API
The forecast endpoint provides up to 5 days of daily pollen information. We chose to display the month, day,

    GET /forecast
    GET /forecast/{id}

Our app routes using the Google Maps Pollen API can either get a 5 day pollen forecast, or get the forecast for a specific day.
    

## Comment APIs
A comment database is used to store and retrieve user posted feedback regarding the pollen prediction website

    GET /comments
    POST /comments
    DELETE /comments

The user is able to post and delete comments on the Feed page. The Comments API gets all the comments stored in the database and displays them on the Feed page.


## Symptoms API
A symptoms database is used to store and change a user input symptoms log. For each days' more detailed allergy report, the user is able to report their own allergy symptoms.

    GET /symptoms/{id}
    POST /symptoms/{id}
    PUT /symptoms{id}


## Other Sources
* We used Mary's Theme by Stelvio Cipriani as background audio!

* We also used a gif we found online. Here is that citation:
“Pixel Bees.” PicMix.com, 2022, en.picmix.com/stamp/pixel-bees-2354092.
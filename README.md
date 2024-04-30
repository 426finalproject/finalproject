# Final Project

For our final project, we wanted to create an Allergy Forecast Application. 

We used a 3rd party Google Maps Pollen API to retrieve 5 days of pollen data.
We also created our own Comment API and Status API to to store and update user input on the pollen forecast in two databases.

### Google Maps Pollen API
The forecast endpoint provides up to 5 days of daily pollen information. We chose to display the month, day,

    GET /forecast
    GET /forecast/{id}
    POST /forecast/{id}
    PUT /forecast/{id}


### Comment APIS
A comment database is used to store and retrieve user posted feedback regarding the pollen prediction website

    GET /commentsSS
    POST /comments/
    DELETE /comments


### Status API
A status database is used to change the predicted pollen level status into something that the user feels is more accurate for them.


### Other Sources
We used Mary's Theme by Stelvio Cipriani as background audio!

We also used a gif we found online. Here is that citation:
“Pixel Bees.” PicMix.com, 2022, en.picmix.com/stamp/pixel-bees-2354092.
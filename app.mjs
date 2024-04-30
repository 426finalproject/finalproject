import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Forecast} from './forecast.mjs';
import {Comment} from './comment.mjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/forecast', async (req, res) => {
    let forecast = await Forecast.getAll();
    if(!forecast){
        res.status(500).send("Unable to retreive forecasts");
        return;
    }
    res.json(forecast);
});

app.get('/forecast/:id', async (req, res) => {
    let forecast = await Forecast.getDay(req.params.id);
    if (!forecast) {
        res.status(500).send("Unable to retreive forecasts");
        return;
    }
    res.json(forecast);
});

app.post('/forecast', async (req, res) => {
    // post status
    
    // let comment = await Comment.create(req.body);
    // if (!comment) {
    //     res.status(400).send("Bad request");
    //     return;
    // }
    // res.status(201).json(comment);
})

app.get('/comments', async (req, res) => {
    let comments = await Comment.getComments();
    if(!comments) {
        res.status(500).send("Unable to retreive comments");
        return;
    }
    res.json(comments);
})

app.post('/comments', async (req, res) => {
    let comment = await Comment.create(req.body);
    if (!comment) {
        res.status(400).send("Bad request");
        return;
    }
    res.status(201).json(comment);
})

app.delete('/comments', async (req, res) => {
    let comment = await Comment.removeComments(req.body.id);     //returns true or false
    if (!comment) {
        res.status(400).send("Bad request");
        return;
    }
    res.json(comment);
})



app.listen(port, () => {
    console.log('Running...');
})
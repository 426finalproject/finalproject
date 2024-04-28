import express from 'express';
import bodyParser from 'body-parser';
import {Forecast} from './forecast.mjs';
import {Comment} from './comment.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/forecast', async (req, res) => {
    let forecast = await Forecast.getForcast();
    if(!forecast){
        res.status(400).send("Bad request");
        return;
    }
    res.json(forecast.json());
});

app.get('/forecast/:id', async (req, res) => {
    let forecast = await Forecast.findByDay(req.params.id);
    if (!forecast) {
        res.status(400).send("Bad request");
        return;
    }
    res.json(forecast.json());
});

app.get('/comments', async (req, res) => {
    let comments = await Comment.getComments();
    if(!comments){
        res.status(400).send("Bad request");
        return;
    }
    res.json(comments.json());
})

app.post('/comments', async (req, res) => {
    let comment = await Comment.create(req.body);
    if (!comment) {
        res.status(400).send("Bad request");
        return;
    }
    res.status(201).json(comment.json());
})

app.listen(port, () => {
    console.log('Running...');
})
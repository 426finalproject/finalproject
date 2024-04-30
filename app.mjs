import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Forecast} from './forecast.mjs';
import {Status} from './status.mjs'
import {Comment} from './comment.mjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/forecast', async (req, res) => {
    let forecasts = await Forecast.getAll();
    if(!forecasts){
        res.status(500).send('Unable to retreive forecasts');
        return;
    }
    res.json(forecasts);
});

app.get('/forecast/:id', async (req, res) => {
    let forecast = await Forecast.getDay(req.params.id);
    if (!forecast) {
        res.status(500).send('Unable to retreive forecast');
        return;
    }
    res.json(forecast);
});

app.get('/status', async (req, res) => {
    let status = await Status.getText(req.body.id);
    if (!status) {
        res.status(500).send('Unable to retreive statuses');
        return;
    }
    res.json(status);
});

app.post('/status/:id', async (req, res) => {
    let status = await Status.setText(req.params.id, req.body.text);
    if (!status) {
        res.status(400).send('Bad request');
        return;
    }
    res.status(201).json(status);
});

app.put('/status/:id', async (req, res) => {
    let status = await Status.updateText(req.params.id, req.body.text);
    if (!status) {
        res.status(400).send('Bad request');
        return;
    }
    res.json(status);
});

app.get('/comments', async (req, res) => {
    let comments = await Comment.getComments();
    if(!comments) {
        res.status(500).send('Unable to retreive comments');
        return;
    }
    res.json(comments);
})

app.post('/comments', async (req, res) => {
    let comment = await Comment.create(req.body);
    if (!comment) {
        res.status(400).send('Bad request');
        return;
    }
    res.status(201).json(comment);
})

app.delete('/comments', async (req, res) => {
    let successful = await Comment.removeComment(req.body.id); // true or false
    if (!successful) {
        res.status(400).send('Bad request');
        return;
    }
    res.json(successful);
})

app.listen(port, () => {
    console.log('Running...');
})
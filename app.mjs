import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Forecast} from './forecast.mjs';
import {Symptom} from './symptom.mjs'
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

app.get('/symptom/:id', async (req, res) => {
    let symptom = await Symptom.getText(req.params.id);
    if (!symptom) {
        res.status(500).send('Unable to retreive symptom');
        return;
    }
    res.json(symptom);
});

app.post('/symptom/:id', async (req, res) => {
    let symptom = await Symptom.setText(req.params.id, req.body.text);
    if (!symptom) {
        res.status(400).send('Bad request');
        return;
    }
    res.status(201).json(symptom);
});

app.put('/symptom/:id', async (req, res) => {
    let symptom = await Symptom.updateText(req.params.id, req.body.text);
    if (!symptom) {
        res.status(400).send('Bad request');
        return;
    }
    res.json(symptom);
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
    let comment = await Comment.create(req.body.text);
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
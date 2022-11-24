require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db.js');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/terms', (req, res) => {
  db.getTerms()
    .then(terms => {
      res.status(200).send(terms);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('failed to get terms');
    })
});

app.post('/terms', (req, res) => {
  db.saveTerm(req.body.term, req.body.description)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('did not save');
    })
});

app.put('/terms/:term', (req, res) => {
  db.modifyTerm(req.params.term, req.body.newTerm, req.body.newDefinition)
    .catch(err => {
      console.log(err);
      throw new Error('Did not change')
    })
    .then(() => {
      return db.getTerms()
    })
    .then((terms) => {
      res.status(200).send(terms);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

app.delete('/terms/:term', (req, res) => {
  db.deleteTerm(req.params.term)
    .catch(err => {
      console.log(err);
      throw new Error('Did not delete')
    })
    .then(() => {
      return db.getTerms()
    })
    .then((terms) => {
      res.status(200).send(terms);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

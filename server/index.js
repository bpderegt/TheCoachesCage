const express = require('express');
const app = express();
const port = 1906;

const { init, updatedParams } = require('./model.js');

app.use(express.static(__dirname + '/../client/dist'));

app.get('/init/:id1/:id2', (req, res) => {
  init(req.params.id1, req.params.id2, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.get('/updatedParams/:id1/:id2', (req, res) => {
  updatedParams(req.params.id1, req.params.id2, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.listen(port, () => console.log(`Sit Ready. Attention... HOST! (at port ${port})`))
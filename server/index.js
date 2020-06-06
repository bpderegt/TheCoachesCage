const express = require('express');
const app = express();
const port = 1906;

const { init } = require('./model.js');

app.use(express.static(__dirname + '/../client/dist'));
// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/init/:id1/:id2', (req, res) => {
  // console.log()
  init(req.params.id1, req.params.id2, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })
})

app.listen(port, () => console.log(`Sit Ready. Attention... HOST! (at port ${port})`))
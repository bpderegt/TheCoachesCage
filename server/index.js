const express = require('express')
const app = express()
const port = 1906

app.use(express.static(__dirname + '/../client/dist'));
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Sit Ready. Attention... HOST! (at port ${port})`))
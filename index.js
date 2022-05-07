const express = require('express');

const userRoute = require('./routes/userRoute');

const app = express();
const port = 3000;

userRoute(app)

app.get('/', (req, res) => res.send('Ola mundo em express'));

app.listen(port, () => console.log('toc toc na porta 3000'));
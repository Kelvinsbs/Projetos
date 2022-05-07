const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/userRoute');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded( {extended: false} ))

userRoute(app)

app.get('/', (req, res) => res.send('Ola mundo em express'));

app.listen(port, () => console.log('toc toc na porta 3000'));
const express = require('express');
const app = express();

const home = require('./routes/home');
const pdf = require('./routes/pdf');

require('dotenv').config();

// disabled branding
app.disable('x-powered-by');

// static folder
app.use(express.static(__dirname + '/public'));
console.log(process.env);
// routes
app.get('/', home);
app.get('/pdf', pdf);

// start app
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '4900';
app.listen(port, host, () => {
    console.log(`App started at http://${host}:${port}`);
});

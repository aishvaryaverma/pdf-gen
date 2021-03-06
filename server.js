const express = require('express');
const app = express();

const home = require('./routes/home');
const pdf = require('./routes/pdf');

require('dotenv').config();

// disabled branding
app.disable('x-powered-by');

// static folder
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', home);
// app.get('/pdf', pdf);

// start app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});

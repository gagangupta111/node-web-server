const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engines', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;

    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if(err){
            console.log(' Unable to append file : server.log');
        }
    });
    next();
});

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('allCapitals', (message) => {
    return message.toUpperCase();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance page title set!'
//     });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page title set!',
        name: 'gagan',
        likes: 32,
        interests: [
            'biking',
            'cycling'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page title set!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle'
    });
});

app.listen(port);
console.log(`App is listening on port: ${port}`);

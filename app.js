const express = require('express');

const app = express();
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// More imports here

app.get('/', (req, res) => {
    res.render('home');
});

// Gets have to be before 404
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.use((req, res, next) => {
    console.log("Looking for URL: " + req.url);
    next();
});

app.get('/junk', (req, res, next) => {
    console.log("Tried to access /junk");
    throw new Error("/junk doesn't exist");
});

app.use((err, req, res, next) => {
    console.log('Error: %s', err.message);
    next();
});

app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

const server = app.listen(app.get('port'), 'localhost', () => {
    const addr = server.address();
    console.log('Express started on %s:%s\nPress Ctrl-c to terminate', addr.address, addr.port);
});

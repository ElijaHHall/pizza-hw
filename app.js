/* dependencies & app setup */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const pizza = require('./db/pizza.js');

/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

/* set the view engine */
app.set('views', './views');
app.set('view engine', 'ejs');

/* error logger, static routes */
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.get('/pizza', function (req, res)  {
	console.log(pizza);
	res.render('index', {pizza:pizza});

});

app.get('/pizza/:id', function(req, res)  {
	console.log(req.params.id);
	let id = req.params.id;
	let pizzas = pizza[req.params.id];
	res.send(pizza);
});

app.post('/pizza/:id', function(req, res)  {
	let id = req.pizzas.id;
	res.redirect('/pizza/' + id);
});
app.post ('/videos/:id', (request, response) => {
	let id = request.videos.id;
	response.redirect('/videos/' + id);
});

app.get('/pizza/:id', (request, response) => {
    response.send('pizza by id');
});
app.get('/flavor', (request, response) => {
	response.send('flavor');
});
app.get('/location/:id', (request, response)=> {
	response.send('location by id');
});
/* error handler */
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
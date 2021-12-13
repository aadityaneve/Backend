const { start, app } = require('./server');

const movieController = require('./controllers/movie.controller');
const seatController = require('./controllers/seat.controller');
const showController = require('./controllers/show.controller');

console.clear();

app.use('/', movieController);

app.use('/', seatController);

app.use('/', showController);

start();

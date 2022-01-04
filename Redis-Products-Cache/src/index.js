const { start, app } = require('./server');

const productController = require('./controllers/product.controller');

app.use('/products', productController);

start();

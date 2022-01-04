const { start, app } = require('./server');

const productController = require('./controllers/product.controller');
const sellerController = require('./controllers/seller.controller');

app.use('/product', productController);
app.use('/seller', sellerController);

start();

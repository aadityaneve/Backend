const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        product_name: { type: String, required: true },
        product_price: { type: Number, required: true },
        porduct_brand: {
            type: String,
            required: false,
            default: 'unlisted',
        },
        product_weight: { type: Number, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Product = mongoose.model('product', productSchema);

module.exports = Product;

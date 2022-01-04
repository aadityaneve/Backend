const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        product_name: { type: String, required: true, unique: true },
        product_price: { type: Number, required: true },
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seller',
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Product = mongoose.model('product', productSchema);

module.exports = Product;

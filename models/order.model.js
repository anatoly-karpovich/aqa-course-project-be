import mongoose from "mongoose";

const Order = new mongoose.Schema( {
    status: {type: String, required: true},
    customer: {type: mongoose.SchemaTypes.ObjectId, ref: 'Customer'},
    requestedProducts: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true}],
    receivedProducts: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true}],
    delivery: {type: String, required: true},
    total_price: {type: Number, require: true}
})

export default mongoose.model('Order', Order)
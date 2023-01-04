import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema( {
    name: {type: String, unique: true, required: true},
    amount: {type: Number, required: true},
    price: {type: Number, required: true},
    manufacturer: {type: String, required: true },
    notes: {type: String, required: false },
})
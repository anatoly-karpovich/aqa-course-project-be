import mongoose from "mongoose";
import { ProductSchema } from "../schemas/products.schema.js";

// export const ProductSchema = new mongoose.Schema( {
//     name: {type: String, unique: true, required: true},
//     amount: {type: Number, required: true},
//     price: {type: Number, required: true},
//     manufacturer: {type: String, required: true },
//     notes: {type: String, required: false },
// })

export default mongoose.model('Product', ProductSchema)
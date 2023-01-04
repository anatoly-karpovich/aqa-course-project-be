import mongoose from "mongoose";

export const CustomerSchema = new mongoose.Schema( {
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true },
    address: {type: String, required: true },
    phone: {type: String, required: true },
    notes: {type: String, required: false },
})

export default mongoose.model('Customer', CustomerSchema)

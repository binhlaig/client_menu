import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    cart: {
        type: Array,
        default: [],
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }


});
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
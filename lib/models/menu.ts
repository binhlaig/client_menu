import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({

    barcode: String,
    productname: String,
    description: String,
    producttype: String,
    price: String,
    image: String,
    tags: [String],
    size: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
export default Menu;
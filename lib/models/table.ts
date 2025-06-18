import mongoose from "mongoose";


const tableSchema = new mongoose.Schema({
    tableNumber: String,
    tableName: String,
    status: {
        type: String,
        enum: ["available", "occupied", "reserved"],
        default: "available",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Table = mongoose.models.Table || mongoose.model("Table", tableSchema);
export default Table;
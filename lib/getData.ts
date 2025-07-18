"use server";

import { TableCellsSplitIcon } from "lucide-react";
import Menu from "./models/menu";
import Order from "./models/order";
import Table from "./models/table";
import { connectToDB } from "./mongoDB";
import { table } from "console";
import mongoose from "mongoose";

interface OrderType {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
    // Add other fields your Order schema includes
    [key: string]: any;
  }

export async function getMenu() {
    try {
        await connectToDB();
        const mneu = await Menu.find({}).sort({ createdAt: -1 }).limit(10).lean();
        return mneu.map((menu: any) => ({
            _id: menu._id.toString(),
            barcode: menu.barcode,
            productname: menu.productname,
            description: menu.description,
            producttype: menu.producttype,
            price: menu.price,
            image: menu.image || "/wall-apple.jpeg",
            tags: menu.tags || [],
            size: menu.size || [],
            status: menu.status || "available",
            createdAt: menu.createdAt.toISOString(),
            updatedAt: menu.updatedAt.toISOString(),
        }));

    } catch (error) {
        console.error("Error fetching menu:", error);
        return [];
    }

}
export async function getTable() {
    try {
        await connectToDB();
        const tables = await Table.find({}).sort({ createdAt: -1 }).lean();
        return tables;
    } catch (error) {
        console.error("Error fetching table:", error);
        return [];

    }
}
export async function getOrderSlots() {
    try {
        await connectToDB();
        const slots = await Order.find({ status: "pending" });
        return (slots);


    } catch (error) {
        console.error("Error fetching order slots:", error);
        return [];

    }
}


// export async function getOrderById(orderId: string) {

//     try {
//         if (!mongoose.Types.ObjectId.isValid(orderId)) {
//             console.error("Invalid orderId:", orderId);
//             return null;
//         }
//         await connectToDB();
//         const order = await Order.findById(orderId);
//         return order;



//     } catch (error) {
//         console.error("Error fetching order by ID:", error);
//         return null;
//     }
// }

export async function getOrderById(orderId: string): Promise<OrderType | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        console.error("Invalid orderId:", orderId);
        return null;
      }
  
      await connectToDB();
  
      const order = await Order.findById(orderId).lean() as OrderType | null; // Ensure it's treated as a single object
  
      if (!order) return null;
  
      // Convert to a serializable format
      const serializedOrder: OrderType = {
        ...order,
        _id: order._id.toString(),
        createdAt: order.createdAt?.toString(),
        updatedAt: order.updatedAt?.toString(),
      };
  
      return serializedOrder;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null;
    }
  }

export async function getOrders() {
    try {
        await connectToDB();
        const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
        return orders;

    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}
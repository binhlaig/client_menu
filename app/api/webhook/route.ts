import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { request } from "http";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { cartitems } = await req.json();
        await connectToDB();
        const newOrder = new Order({
            cart: cartitems,
            total: cartitems.reduce((acc: number, item: { item: { price: number; }; quantity: number; }) => acc + (item.item.price * item.quantity), 0),
            status: "pending",
        });
        await newOrder.save();

    } catch (error) {
        console.error("Error processing webhook:", error);
        return new Response("Internal Server Error", { status: 500 });

    }
}
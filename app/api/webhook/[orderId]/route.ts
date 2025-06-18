import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest } from "next/server";


export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) => {
    try {
        const { orderId } = await params;
        const { updatecartItem } = await req.json();

        await connectToDB();

        // const updatedOrder = await Order.findByIdAndUpdate(
        //     orderId,
        //     {
        //         cart: updatecartItem,
        //         total: updatecartItem.reduce((acc: number, item: { item: { price: number }; quantity: number }) => acc + (item.item.price * item.quantity), 0),
        //     },
        //     { new: true } // Return the updated document
        // );

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $push: { cart: { $each: updatecartItem } },

            },
            { new: true }
        );


        return new Response(JSON.stringify(updatedOrder), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error updating order:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
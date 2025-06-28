import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest } from "next/server";


export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) => {
    try {
        const { orderId } = await params;
        const { updatecartItem } = await req.json();

        await connectToDB();
        // Add note: "pending" to each cart item
        const itemsWithNote = updatecartItem.map((item: any) => ({
            ...item,
            note: "pending",
        }));

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                // $push: { cart: { $each: updatecartItem } }, 
                $push: { cart: { $each: itemsWithNote } },

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
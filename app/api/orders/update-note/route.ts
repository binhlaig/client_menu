import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
  await connectToDB()
  const { orderId, itemId, note } = await req.json();

  try {
    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const item = order.cart.find((i: any) => i.item._id.toString() === itemId);
    if (item) item.note = note;

    await order.save();

    return NextResponse.json({ success: true, updated: item });
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

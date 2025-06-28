import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
// Your MongoDB model

export async function GET() {
  await connectToDB();

  const orders = await Order.find().lean();
  const pendingOrders = orders.filter(order =>
    order.cart.some((item: { note: string }) => item.note === "pending")
  );

  return NextResponse.json(pendingOrders);
}

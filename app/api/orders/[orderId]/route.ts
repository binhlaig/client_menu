import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";


// export async function PUT(
//   req: Request,
//   context: { params: { orderId: string } }
// ) {
//   const { orderId } = context.params;
//   await connectToDB();
//   const { itemId, note } = await req.json();

//   try {
//     const updatedOrder = await Order.findOneAndUpdate(
//       {
//         _id: orderId,
//         "cart.item._id": itemId,
//       },
//       {
//         $set: {
//           "cart.$.note": note || "processing",
//         },
//       },
//       { new: true }
//     );
//     console.log("Updated Order:", itemId);
    

//     return NextResponse.json(updatedOrder);
//   } catch (error) {
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }



export async function PUT(
  req: Request,
  context: { params: { orderId: string } }
) {
  await connectToDB();
  const { itemId, note } = await req.json();

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: context.params.orderId,
        "cart.id": itemId, // Using `cart.id` not `cart.item._id`
      },
      {
        $set: {
          "cart.$.note": note || "completed",
        },
      },
      { new: true }
    );

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
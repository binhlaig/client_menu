"use client";
import CartUse from "@/components/hook/CartUse";
import CartUseUpdate from "@/components/hook/UpdateCart";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const Editcartpage = ({ params }: { params: Promise<{ menuId: string; orderId: string }> }) => {

  const cart = CartUseUpdate();
  const route = useRouter();

  const total = cart.updatecartItem.reduce(
    (acc, cartItem) => acc + Number(cartItem.item.price) * cartItem.quantity,
    0
  );

  const totalRounded = parseFloat(total.toFixed(2));
  const updateOrder = async () => {
    try {
      const { orderId } = await params;
      const response = await fetch(`/api/webhook/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatecartItem: cart.updatecartItem,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      const updatedOrder = await response.json();
      console.log("Updated Order:", updatedOrder);
      toast.success("Order updated successfully");
      route.push('/Success');


    } catch (error) {
      console.error("Error fetching order:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  return (
    <div className="flex gap-20 py-16 px-10">
      <div className="w-2/3">
        <p className="font-bold">Shopping Cart</p>
        <hr />

        <div>
          {cart.updatecartItem.length === 0 ? (
            <p className="flex hover:bg-gray-100 px-6 py-5 justify-center items-center">
              no cart
            </p>
          ) : (
            <div key="">
              {cart.updatecartItem.map((cartItem) => (
                <div className="w-full flex hover:bg-gray-100 px-6 py-5 justify-between items-center">
                  <div className="flex items-center">
                    <Image
                      src={cartItem.item.image || "/noimage.jpeg"}
                      alt="product"
                      width={70}
                      height={70}
                      className="rounded-sm w-28 h-28 object-cover"
                    />
                    <div className="flex flex-col gap-3 ml-4">
                      <p className="font-bold">{cartItem.item.productname}</p>
                      {cartItem.size && (
                        <p className="text-sm">{cartItem.size}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 ml-4">
                      <p className="text-sm">Menu Id : {cartItem.item.barcode}</p>


                    </div>

                  </div>

                  <div className="flex gap-4 items-center">
                    <MinusCircle
                      className="hover:text-red-600 cursor-pointer"
                      onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                    />
                    <p className=" text-black">{cartItem.quantity}</p>
                    <PlusCircle
                      className="hover:text-red-600 cursor-pointer"
                      onClick={() => cart.increaseQuantity(cartItem.item._id)}
                    />
                  </div>
                  <p className="font-bold">
                    {Number(cartItem.item.price) * cartItem.quantity} ¥{" "}
                  </p>
                  <Trash2
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-100 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.updatecartItem.length} ${cart.updatecartItem.length > 1 ? "items" : "item"
            })`}</span>
        </p>
        <div className="flex justify-between">
          <span>Total Amount</span>
          <span>{totalRounded} ¥</span>
        </div>
        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={updateOrder}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );;

}

export default Editcartpage


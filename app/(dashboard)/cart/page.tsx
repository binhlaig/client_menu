"use client";
import CartUse from "@/components/hook/CartUse";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CartPage = () => {
  const cart = CartUse();
  const router = useRouter();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + Number(cartItem.item.price) * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const getOrder = async () => {
    if (cart.cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        body: JSON.stringify({ cartitems: cart.cartItems }),
      });
      if (response.ok) {
        toast.success("Order placed successfully!");
      }
      router.push("/Success");
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 py-10 px-4 md:px-10">
      {/* Cart Items */}
      <div className="w-full lg:w-2/3">
        <p className="text-xl font-bold mb-4">Shopping Cart</p>
        <hr className="mb-4" />

        {cart.cartItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No items in cart.
          </div>
        ) : (
          <div className="space-y-6">
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-md shadow-sm"
              >
                {/* Left side: image & product info */}
                <div className="flex flex-1 gap-4">
                  <Image
                    src={cartItem.item.image || "/noimage.jpeg"}
                    alt="product"
                    width={80}
                    height={80}
                    className="rounded w-24 h-24 object-cover"
                  />
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="font-bold">{cartItem.item.productname}</p>
                    {cartItem.size && <p>Size: {cartItem.size}</p>}
                    <p>Menu ID: {cartItem.item.barcode}</p>
                    {cartItem.table && <p>Table: {cartItem.table}</p>}
                  </div>
                </div>

                {/* Quantity and price controls */}
                <div className="flex items-center gap-3">
                  <MinusCircle
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <span>{cartItem.quantity}</span>
                  <PlusCircle
                    className="cursor-pointer hover:text-green-600"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between gap-2">
                  <p className="font-bold">
                    {Number(cartItem.item.price) * cartItem.quantity} ¥
                  </p>
                  <Trash2
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-md shadow-sm">
        <p className="text-lg font-semibold mb-4">
          Summary{" "}
          <span className="text-sm text-gray-500">
            ({cart.cartItems.length}{" "}
            {cart.cartItems.length > 1 ? "items" : "item"})
          </span>
        </p>

        <div className="flex justify-between mb-6 text-sm">
          <span>Total Amount</span>
          <span className="font-semibold">{totalRounded} ¥</span>
        </div>

        <Button
          onClick={getOrder}
          disabled={cart.cartItems.length === 0}
          className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UpdateNoteButton from "@/components/ClientButton";

const PendingOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch
    const interval = setInterval(fetchOrders, 5000); // Poll every 5s

    return () => clearInterval(interval); // Clean up
  }, []);

  if (!orders.length) {
    return <p className="text-gray-500">No pending items found.</p>;
  }

  return (
    <div className="flex gap-10 py-8 px-6 w-full flex-col">
      <p className="font-bold">Pending Orders</p>
      <hr />
      {orders.map((order, index) => (
        <div key={order._id || index}>
          {order.cart
            .filter((menu: any) => menu.note === "pending")
            .map((menu: any) => (
              <div
                key={menu.id}
                className="w-full flex hover:bg-gray-100 px-6 py-5 justify-between items-center"
              >
                <div className="flex items-center">
                  <Image
                    src={menu.item.image || "/noimage.jpeg"}
                    alt="Product Image"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="font-bold">{menu.item.productname}</p>
                    <p className="text-sm">{menu.size}</p>
                    <p>{menu.id}</p>
                  </div>
                </div>
                <p>{menu.table}</p>

                <div className="flex gap-10 text-center">
                  <p className="text-black">{menu.quantity}</p>
                  <p>{menu.note}</p>
                </div>

                <UpdateNoteButton
                  orderId={order._id}
                  itemId={menu.id}
                  currentNote={menu.note}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default PendingOrders;

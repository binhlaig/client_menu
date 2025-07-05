"use client";

import SeleteTable from "@/components/SeleteTable";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CartUse from "@/components/hook/CartUse";

const productDetailpage = ({
  params,
}: {
  params: Promise<{ menuId: string; orderId: string }>;
}) => {
  const [productDetails, setProductDetails] = useState<
    (ProductDetailsType & { getFilteredSelectedRowModel: () => void }) | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [tables, setTable] = useState<string>("");
  const [tableDetails, setTableDetails] = useState<
    (TableType & { getFilteredSelectedRowModel: () => void }) | null
  >(null);

  const [quantity, setQuantity] = useState<number>(1);
  const cart = CartUse();

  type CartItem = {
    id: string;
    item: ProductDetailsType;
    quantity: number;
    size: string;
  };
  const route = useRouter();

  const fetchProductDetails = async () => {
    setLoading(true);

    try {
      const { menuId } = await params;
      const response = await fetch(`/api/menus/${menuId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProductDetails(data);
      setLoading(false);
      toast.success("Product details fetched successfully", {
        icon: "✅",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchTableDetails = async () => {
    try {
      const response = await fetch("/api/table", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTableDetails(data);
      toast.success("Table details fetched successfully", {
        icon: "✅",
      });
    } catch (error) {
      console.error("Error fetching table details:", error);
      toast.error("Failed to fetch table details", {
        icon: "❌",
      });
    }
  };

  const getAdjustedPrice = () => {
    if (!productDetails) return 0;
    let basePrice = Number(productDetails.price) || 0;
    if (selectedSize === "L") {
      basePrice += Number(200);
    }
    return basePrice;
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  useEffect(() => {
    fetchTableDetails();
  }, []);

  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <div className="flex flex-col gap-3 max-w-[500px]">
        <Image
          src={productDetails?.image || "/noimage.jpeg"}
          alt="product"
          width={400}
          height={300}
        />
      </div>
      <div className="max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-black font-bold text-2xl">
            {productDetails?.producttype}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-base text-gray-500">Menu Id :</p>
          <p className="text-black font-bold">{productDetails?.barcode}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-base "> Price:</p>
          {/* <p className=" font-bold">{productDetails?.price} 円 </p> */}
          <p className="font-bold">{getAdjustedPrice()} 円</p>
        </div>
        <div className="flex gap-2">
          <p className="text-base "> Descripton :</p>
          <p className="font-bold">{productDetails?.description}</p>
        </div>
        <div className="flex gap-2">
          <p>Sizes :</p>
          <div className="flex gap-2">
            {productDetails?.size?.map((size, index) => (
              <p
                key={index}
                className={`cursor-pointer hover:outline px-2 py-1 rounded-lg  ${
                  selectedSize === size &&
                  "bg-blue-800 text-white border border-blue-900 px-2 py-1 rounded-lg"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base p-2">Table</p>
          <div className="flex gap-2">
            {Array.isArray(tableDetails) &&
              tableDetails.map((table: any) => (
                <p
                  key={table._id}
                  className={`cursor-pointer hover:outline px-2 py-1 rounded-lg  ${
                    tables === table.tableNumber &&
                    "bg-blue-800 text-white border border-blue-900 px-2 py-1 rounded-lg"
                  }`}
                  onClick={() => setTable(table.tableNumber)}
                >
                  {table.tableNumber}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-ms text-gray-500">Qiantity</p>
          <div className="flex gap-4 items-center">
            <MinusCircle
              className="hover:text-red-600 cursor-pointer"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            />
            <p className=" text-black">{quantity}</p>
            <PlusCircle
              className="hover:text-red-600 cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            />
          </div>
        </div>
        <Button
          className="bg-blue-800 text-white hover:bg-blue-900"
          onClick={async () => {
            cart.addItem({
              id: crypto.randomUUID(),
              // item: productDetails!,
              item: {
                ...productDetails!,
                price: String(getAdjustedPrice()),
              },
              quantity,
              size: selectedSize,
              table: tables,
              note: "pending",
            });
            const { orderId } = await params;
            route.push(`/${orderId}/cart`);
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default productDetailpage;

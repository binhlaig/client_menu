"use client"

import CartUse from "@/components/hook/CartUse";
import Link from "next/link";
import { useEffect } from "react";



const orderPage = () => {
  const cart= CartUse();
  
  useEffect(()=>{
    cart.clearCart()
  },[])
  
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-red-1">Successful Payment</p>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default orderPage;

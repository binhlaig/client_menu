
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import { LuPartyPopper } from "react-icons/lu";
// import { GiPriceTag } from "react-icons/gi";
// import { getMenu, getOrderById } from "@/lib/getData";
// import { Button } from "@/components/ui/button";


// const page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
//     const param = await params
//     const order = await getOrderById(param.orderId);
//     const menu = await getMenu();

//     return (
//         <div>
//             <div className="z-5 relative mx-auto w-full text-center">
//                 <h1 className="mb-8 text-2xl font-bold leading-none tracking-normal md:text-3xl md:tracking-tight">
//                     Menu
//                 </h1>
//             </div>
//             <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
//                 <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                     {menu.map((menus) => (
//                         <Card className="w-60 border-transparent bg-slate-50 shadow-md dark:bg-black">
//                             <CardContent className="p-1">
//                                 <Link href="/dashboard" className="flex h-40 w-full justify-center overflow-hidden rounded-md">
//                                     <Image
//                                         src={menus.image ? menus.image : "/wall-apple.jpeg"}
//                                         alt={menus.productname}
//                                         width={100}
//                                         height={100}
//                                         className="rounded-md object-contain transition-all hover:scale-105 cursor-pointer"
//                                     />
//                                 </Link>
//                             </CardContent>
//                             <CardFooter className="flex flex-col p-1">
//                                 <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
//                                     {" "}
//                                     {menus.productname}{" "}
//                                 </h3>
//                                 <div className="flex justify-between gap-12">
//                                     <p className="flex items-center gap-2 ">
//                                         {" "}
//                                         <LuPartyPopper className="text-green-600" />{" "}
//                                         <span className="overflow-hidden text-ellipsis whitespace-nowrap">
//                                             {menus.producttype}{" "}
//                                         </span>
//                                     </p>
//                                     <p className="flex items-center gap-2 font-bold">
//                                         {" "}
//                                         <GiPriceTag className="text-green-600" />{" "}
//                                         <span className="overflow-hidden text-ellipsis whitespace-nowrap">
//                                             {menus.price}{" "} ¥
//                                         </span>
//                                     </p>
//                                 </div>

//                                 <Link href={`/${order?._id}/${menus._id}`} className="w-full py-3">
//                                     <Button variant="outline" className="w-full">
//                                         {" "}
//                                         Order Now
//                                     </Button>
//                                 </Link>
//                             </CardFooter>
//                         </Card>
//                     ))}
//                 </div>


//             </div>


//         </div>
//     )
// }

// export default page

'use client';

import { useEffect, useState, useRef } from "react";
import { getMenu, getOrderById } from "@/lib/getData";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MenuCard from "@/components/Memu/MenuCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MenuPage = () => {
  const { orderId } = useParams();
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [menuData, orderData] = await Promise.all([
        getMenu(),
        getOrderById(orderId as string),
      ]);
      setMenu(menuData);
      setOrder(orderData);
    };
    fetchData();
  }, [orderId]);

  const categories = [
    { value: "Food", name: "料理" },
    { value: "Drink", name: "飲み物" },
    { value: "BBQ", name: "焼肉" },
  ];

  const scroll = (ref: HTMLDivElement | null, direction: "left" | "right") => {
    if (!ref) return;
    const amount = 300;
    ref.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800"> Update Order Our Menu</h1>
        <p className="text-gray-500 mt-2">Explore our delicious offerings</p>
      </div>

      {categories.map((category) => {
        const items = menu.filter((item) => item.producttype === category.value);
        const scrollRef = useRef<HTMLDivElement>(null);

        return (
          <div key={category.value} className="mb-16 px-4">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">{category.name}</h2>

            <div className="relative">
              {/* Left Button */}
              <button
                onClick={() => scroll(scrollRef.current, "left")}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-blue-100"
              >
                <FaChevronLeft />
              </button>

              {/* Right Button */}
              <button
                onClick={() => scroll(scrollRef.current, "right")}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-blue-100"
              >
                <FaChevronRight />
              </button>

              {/* Card Slider */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-6 py-2 no-scrollbar"
              >
                {items.map((item) => (
                  <div key={item._id} className="flex-shrink-0 w-[250px]">
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                      <MenuCard
                        menu={{
                          ...item,
                          size: item.size || [""],
                          getFilteredSelectedRowModel: () => {},
                        }}
                      />
                      <div className="w-full text-center mt-4">
                        <Link href={`/${order?._id}/${item._id}`}>
                          <Button variant="outline"  className="w-full border-green-950 text-green-950 hover:bg-green-800 hover:text-white">
                            Order Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuPage;

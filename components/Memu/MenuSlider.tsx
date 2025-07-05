"use client";

import { useRef } from "react";
import MenuCard from "./MenuCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";

const MenuSlider = ({ menuData }: { menuData: MenuType[] }) => {
  const categories = [
    { value: "Food", name: "料理" },
    { value: "Drink", name: "飲み物" },
    { value: "BBQ", name: "焼肉" },
  ];

  const scroll = (ref: HTMLDivElement | null, direction: "left" | "right") => {
    if (ref) {
      const amount = 300;
      ref.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">Our Menu</h1>
        <p className="text-gray-500 mt-2">
          Explore our delicious offerings by category
        </p>
      </div>

      {categories.map((category, idx) => {
        const items = menuData.filter((item) => item.producttype === category.value);
        const scrollRef = useRef<HTMLDivElement>(null);

        return (
          <div key={category.value} className="mb-16 px-4">
            <h2 className="text-2xl font-bold text-blue-9500 mb-4">
              {category.name}
            </h2>

            <div className="relative">
              <button
                onClick={() => scroll(scrollRef.current, "left")}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-blue-100"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => scroll(scrollRef.current, "right")}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-blue-100"
              >
                <FaChevronRight />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-6 py-2 no-scrollbar"
              >
                {items.map((menu) => (
                  <div key={menu._id} className="flex-shrink-0 w-[250px]">
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                      <MenuCard
                        menu={{
                          ...menu,
                          size: menu.size || [""],
                          getFilteredSelectedRowModel: () => {},
                        }}
                      />

                      <div className="w-full text-center mt-4">
                        <Link
                          href={`/menus/${menu._id}`}
                          className="w-full mt-2"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white"
                          >
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

export default MenuSlider;

import MenuCard from "@/components/Memu/MenuCard";
import { Button } from "@/components/ui/button";
import { getMenu } from "@/lib/getData";
import Link from "next/link";

const page = async () => {
  const Menu = await getMenu();
  const categories = [{ value: "Drink", name: "飲み物 (soft Drink)" }];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">Our Soft drink Menu</h1>
        <p className="text-gray-500 mt-2">
          Explore our delicious offerings by category
        </p>
      </div>

      {categories.map((category) => {
        const items = Menu.filter(
          (item) => item.producttype === category.value
        );
        return (
          <div key={category.value} className="mb-12 px-4">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((menus) => (
                <div key={menus._id} className="flex-shrink-0 w-[250px]">
                  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                    <MenuCard
                      key={menus._id}
                      menu={{
                        ...menus,
                        size: menus.size || [""],
                        getFilteredSelectedRowModel: () => {},
                      }}
                    />

                    <div className="w-full text-center mt-4">
                      <Link href={`/menus/${menus._id}`} className="w-full mt-2">
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
        );
      })}
    </div>
  );
};

export default page;


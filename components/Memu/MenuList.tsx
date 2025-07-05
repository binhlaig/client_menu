// import { getMenu } from "@/lib/getData"
// import MenuCard from "./MenuCard";

// const MenuList = async () => {
//     const Menu = await getMenu();

//     const categories = ["Food", "Drink", "BBQ"];
//     return (
//         // <>
//         //     <div className="z-5 relative mx-auto w-full text-center">
//         //         <h1 className="mb-8 text-2xl font-bold leading-none tracking-normal md:text-3xl md:tracking-tight">
//         //             Menu
//         //         </h1>
//         //     </div>
//         //     <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
//         //         <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         //             {Menu.map((menus) => (
//         //                 <MenuCard key={menus._id} menu={{ ...menus, size: [''], getFilteredSelectedRowModel: () => {} }} />
//         //             ))}
//         //         </div>


//         //     </div>
//         // </>

        
//             <div className="bg-gray-50 min-h-screen py-10">
//               <div className="text-center mb-10">
//                 <h1 className="text-3xl font-extrabold text-gray-800">Our Menu</h1>
//                 <p className="text-gray-500 mt-2">Explore our delicious offerings by category</p>
//               </div>
        
//               {categories.map((category) => {
//                 const items = Menu.filter((item) => item.producttype === category);
//                 return (
//                   <div key={category} className="mb-12 px-4">
//                     <h2 className="text-2xl font-bold text-blue-800 mb-4">{category}</h2>
//                     <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                       {items.map((menus) => (
//                         <MenuCard
//                           key={menus._id}
//                           menu={{
//                             ...menus,
//                             size: menus.size || [""],
//                             getFilteredSelectedRowModel: () => {},
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
          
//     )
// }

// export default MenuList


import MenuSlider from "./MenuSlider";
import { getMenu } from "@/lib/getData";

const MenuList = async () => {
  const Menu = await getMenu();

  return (
    <MenuSlider menuData={Menu} />
  );
};
export default MenuList;


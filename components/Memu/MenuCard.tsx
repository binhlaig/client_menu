// // import {
// //     Card,
// //     CardContent,
// //     CardDescription,
// //     CardFooter,
// //     CardHeader,
// //     CardTitle,
// // } from "@/components/ui/card";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { LuPartyPopper } from "react-icons/lu";
// // import { GiPriceTag } from "react-icons/gi";
// // import { Button } from "../ui/button";

// // const MenuCard = ({ menu }: { menu: MenuType }) => {
// //     const img = menu.image ? menu.image : "/wall-apple.jpeg";
// //     return (
// //         <Card className="w-60 border-transparent bg-slate-50 shadow-md dark:bg-black">
// //             <CardContent className="p-1">
// //                 <Link href="/dashboard" className="flex h-40 w-full justify-center overflow-hidden rounded-md">
// //                     <Image
// //                         src={img}
// //                         alt={menu.productname}
// //                         width={200}
// //                         height={200}
// //                         className="rounded-md object-contain transition-all hover:scale-105 cursor-pointer"
// //                     />
// //                 </Link>
// //             </CardContent>
// //             <CardFooter className="flex flex-col p-1">
// //                 <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
// //                     {" "}
// //                     {menu.productname}{" "}
// //                 </h3>
// //                 <div className="flex justify-between gap-12">
// //                     <p className="flex items-center gap-2 ">
// //                         {" "}
// //                         <LuPartyPopper className="text-green-600" />{" "}
// //                         <span className="overflow-hidden text-ellipsis whitespace-nowrap">
// //                             {menu.producttype}{" "}
// //                         </span>
// //                     </p>
// //                     <p className="flex items-center gap-2 font-bold">
// //                         {" "}
// //                         <GiPriceTag className="text-green-600" />{" "}
// //                         <span className="overflow-hidden text-ellipsis whitespace-nowrap">
// //                             {menu.price}{" "} ¥
// //                         </span>
// //                     </p>
// //                 </div>

// //                 <Link href={`/menus/${menu._id}`} className="w-full py-3">
// //                     <Button variant="outline" className="w-full">
// //                         {" "}
// //                         Order Now
// //                     </Button>
// //                 </Link>
// //             </CardFooter>
// //         </Card>
// //     )
// // }

// // export default MenuCard

// import {
//     Card,
//     CardContent,
//     CardFooter,
//   } from "@/components/ui/card";
//   import Image from "next/image";
//   import Link from "next/link";
//   import { LuPartyPopper } from "react-icons/lu";
//   import { GiPriceTag } from "react-icons/gi";
//   import { Button } from "../ui/button";

//   const MenuCard = ({ menu }: { menu: MenuType }) => {
//     const img = menu.image ? menu.image : "/wall-apple.jpeg";

//     return (
//       <Card className="w-full max-w-xs overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
//         <CardContent className="p-0">
//           <Link href={`/menus/${menu._id}`}>
//             <Image
//               src={img}
//               alt={menu.productname}
//               width={400}
//               height={300}
//               className="w-full h-48 object-cover rounded-t-2xl"
//             />
//           </Link>
//         </CardContent>

//         <CardFooter className="flex flex-col items-start gap-2 p-4">
//           <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate w-full">
//             {menu.productname}
//           </h3>

//           <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-300">
//             <p className="flex items-center gap-1">
//               <LuPartyPopper className="text-green-600" />
//               {menu.producttype}
//             </p>
//             <p className="flex items-center gap-1 font-semibold">
//               <GiPriceTag className="text-green-600" />
//               {menu.price} ¥
//             </p>
//           </div>

//           <Link href={`/menus/${menu._id}`} className="w-full mt-2">
//             <Button
//               variant="outline"
//               className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
//             >
//               Order Now
//             </Button>
//           </Link>
//         </CardFooter>
//       </Card>
//     );
//   };

//   export default MenuCard;

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { LuPartyPopper } from "react-icons/lu";
import { GiPriceTag } from "react-icons/gi";
import { Button } from "../ui/button";

const MenuCard = ({ menu }: { menu: MenuType }) => {
  const img = menu.image || "/wall-apple.jpeg";

  return (
    <Card className="w-full max-w-xs bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg">
      <CardContent className="p-0">
        <Image
          src={img}
          alt={menu.productname}
          width={400}
          height={300}
          className="w-full h-44 object-cover rounded-t-2xl transition-all duration-300 hover:brightness-95"
        />
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        {/* Product name */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-1 w-full">
          {menu.productname}
        </h3>

        {/* Type & Price */}
        <div className="flex justify-between items-center w-full text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1">
            <LuPartyPopper className="text-green-600" />
            {menu.producttype}
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <GiPriceTag className="text-green-600" />
            {menu.price} ¥
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;

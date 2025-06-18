import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { LuPartyPopper } from "react-icons/lu";
import { GiPriceTag } from "react-icons/gi";
import { Button } from "../ui/button";


const MenuCard = ({ menu }: { menu: MenuType }) => {
    const img = menu.image ? menu.image : "/wall-apple.jpeg";
    return (
        <Card className="w-60 border-transparent bg-slate-50 shadow-md dark:bg-black">
            <CardContent className="p-1">
                <Link href="/dashboard" className="flex h-40 w-full justify-center overflow-hidden rounded-md">
                    <Image
                        src={img}
                        alt={menu.productname}
                        width={200}
                        height={200}
                        className="rounded-md object-contain transition-all hover:scale-105 cursor-pointer"
                    />
                </Link>
            </CardContent>
            <CardFooter className="flex flex-col p-1">
                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                    {" "}
                    {menu.productname}{" "}
                </h3>
                <div className="flex justify-between gap-12">
                    <p className="flex items-center gap-2 ">
                        {" "}
                        <LuPartyPopper className="text-green-600" />{" "}
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {menu.producttype}{" "}
                        </span>
                    </p>
                    <p className="flex items-center gap-2 font-bold">
                        {" "}
                        <GiPriceTag className="text-green-600" />{" "}
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {menu.price}{" "} ¥
                        </span>
                    </p>
                </div>

                <Link href={`/menus/${menu._id}`} className="w-full py-3">
                    <Button variant="outline" className="w-full">
                        {" "}
                        Order Now
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default MenuCard

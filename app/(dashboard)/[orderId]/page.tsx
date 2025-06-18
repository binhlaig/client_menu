
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
import { getMenu, getOrderById } from "@/lib/getData";
import { Button } from "@/components/ui/button";


const page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
    const param = await params
    const order = await getOrderById(param.orderId);
    const menu = await getMenu();

    return (
        <div>
            <div className="z-5 relative mx-auto w-full text-center">
                <h1 className="mb-8 text-2xl font-bold leading-none tracking-normal md:text-3xl md:tracking-tight">
                    Menu
                </h1>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
                <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {menu.map((menus) => (
                        <Card className="w-60 border-transparent bg-slate-50 shadow-md dark:bg-black">
                            <CardContent className="p-1">
                                <Link href="/dashboard" className="flex h-40 w-full justify-center overflow-hidden rounded-md">
                                    <Image
                                        src={menus.image ? menus.image : "/wall-apple.jpeg"}
                                        alt={menus.productname}
                                        width={100}
                                        height={100}
                                        className="rounded-md object-contain transition-all hover:scale-105 cursor-pointer"
                                    />
                                </Link>
                            </CardContent>
                            <CardFooter className="flex flex-col p-1">
                                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                    {" "}
                                    {menus.productname}{" "}
                                </h3>
                                <div className="flex justify-between gap-12">
                                    <p className="flex items-center gap-2 ">
                                        {" "}
                                        <LuPartyPopper className="text-green-600" />{" "}
                                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                            {menus.producttype}{" "}
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2 font-bold">
                                        {" "}
                                        <GiPriceTag className="text-green-600" />{" "}
                                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                            {menus.price}{" "} ¥
                                        </span>
                                    </p>
                                </div>

                                <Link href={`/${order?._id}/${menus._id}`} className="w-full py-3">
                                    <Button variant="outline" className="w-full">
                                        {" "}
                                        Order Now
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>


            </div>


        </div>
    )
}

export default page

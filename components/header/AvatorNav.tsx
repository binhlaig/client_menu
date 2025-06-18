"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiOutlineLockClosed } from "react-icons/hi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";


const AvatorNav = () => {
    const { data: session } = useSession();
    const user = session?.user as { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; username?: string | null | undefined; };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" h-8 w-8 rounded-full">
            <Avatar className="">
                <AvatarImage
                    src={(user?.image as string) || "/noavatar.png"}
                    alt="Asian food"
                />
                <AvatarFallback>BN</AvatarFallback>
            </Avatar>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.username}</p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>


        <DropdownMenuItem className="flex gap-2">
            <HiOutlineLockClosed size={18} />
            <Link href="/dashboard">Admin </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <FaMoneyCheckDollar size={18} />
            <Link href="/dashboard/daily_data/Out_Daily">In Daily</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
            <RiMoneyDollarCircleLine size={18} />
            <Link href="/dashboard/daily_data/In_Daily">Out Come</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
        </DropdownMenuItem>
    </DropdownMenuContent>

</DropdownMenu >
  )
}

export default AvatorNav

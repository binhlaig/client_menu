'use client'

import { HiOutlineHome } from "react-icons/hi";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import { GrTableAdd } from "react-icons/gr";
import { GoListOrdered } from "react-icons/go";

export const AdminRoutes = [
    {
        title: "Home",
        href: "/",
        icon: HiOutlineHome,
    },
    {
        title: "Menus",
        href: "/menu",
        icon: BsFillMenuButtonWideFill,
    },
    {
        title: "Register",
        href: "/sign-up",
        icon: TiUserAdd,
    },
    {
        title: "table",
        href: "/table",
        icon: GrTableAdd,
    },
    {
        title: "Orders",
        href: "/orderslots",
        icon: GoListOrdered,
    }
    
];
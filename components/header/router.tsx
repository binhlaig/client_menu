"use client";

import { HiOutlineHome } from "react-icons/hi";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import { GrTableAdd } from "react-icons/gr";
import { GoListOrdered } from "react-icons/go";
//menu routes
import { FaBowlFood } from "react-icons/fa6";
import { MdLocalDrink } from "react-icons/md";

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
  },
];

export const menuRoutes = [
  {
    title: "Home",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    title: "Food",
    href: "/menus/food",
    icon: FaBowlFood,
  },
  {
    title: "Drink",
    href: "/menus/drink",
    icon: MdLocalDrink,
  },
  {
    title: "Yakiniku",
    href: "/menus/yakiniku",
    icon: FaBowlFood,
  },
];

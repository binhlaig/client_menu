"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TiThMenu } from "react-icons/ti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { signOut, useSession } from "next-auth/react";
import SidebarNav from "./SidebarNav";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminRoutes } from "./router";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

const SidebarDrawer = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  //   const LogoutSession = () => {
  //     if ("authenticated") {
  //       return (
  //         <button
  //           className=""
  //           onClick={() => {
  //             signOut({ redirect: false }).then(() => {
  //               router.push("/Sign_in");
  //             });
  //           }}
  //         >
  //           Sign Out
  //         </button>
  //       );
  //     } else if ("loading") {
  //       return (
  //         <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
  //       );
  //     } else {
  //       return (
  //         <Link href="/sign-in" className="border border-black rounded">
  //           Sign In
  //         </Link>
  //       );
  //     }
  //   };
  return (
    <Drawer>
      <DrawerTrigger className="rounded-full  p-2 text-white">
        <TiThMenu size={24} />
      </DrawerTrigger>
      <DrawerContent className="fixed inset-0 mt-0 h-screen w-40">
       
        <DrawerHeader>
          <div className="flex justify-center">
            <Avatar>
              <AvatarImage src={(user?.image as string) || "/noavatar.png"} />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
          </div>
        </DrawerHeader>
        <SidebarNav items={AdminRoutes} showTooltip={false} className="p-4" />
        <DrawerFooter>
          <Separator className="my-4" />
          <div className="flex justify-center">Dark mode</div>
          <DrawerClose>
            <Button
              variant="destructive"
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/Sign_in");
                });
              }}
            >
              Logout
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDrawer;

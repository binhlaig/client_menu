

import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import Header from "@/components/header/Header";


export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession( authOptions);
    if(!session){
        return redirect("/Sign_in")
    }

    return (
        <div className="">
           
            <Header />
            {children}
        </div>
    );
}

import Menu from "@/lib/models/menu";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest, { params }: { params:Promise<{ menuId: string }> }) => {
    

    try {
        await connectToDB();
        const { menuId } = await params;
        const menu = await Menu.findById(menuId);

        return new Response(JSON.stringify(menu), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
    } catch (error) {
        console.error("Error fetching menu:", error);
        return new Response("Internal Server Error", { status: 500 });
        
    }
}
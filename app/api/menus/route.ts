import Menu from "@/lib/models/menu";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest } from "next/server";

export const GET = async (req:NextRequest)=>{
    try {
        await connectToDB();
        const response = await Menu.find().sort({createdAt: "desc"});
        return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } });
        
        
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        
    }
}
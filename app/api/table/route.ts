import Table from "@/lib/models/table";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();
        const response = await Table.find().sort({createdAt: "desc"});
        return NextResponse.json(response,{status:200});
        
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        
    }
}
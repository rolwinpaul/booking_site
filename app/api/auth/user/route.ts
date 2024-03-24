import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
 
export const GET = async (req:Request,res:Response) => { 
    try {
        await connectToDatabase();
        const users = await prisma.user.findMany();
        return NextResponse.json({users},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Server Error"},{status:500});
    } finally{
        await prisma.$disconnect();
    }
}
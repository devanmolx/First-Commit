import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized", status:false }, { status: 401 });
    }

    try {
        
        const activities = await prisma.userActivity.findMany({
            where:{
                userId:session.user.id
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        return NextResponse.json({ activities, status:true })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error", status:false }, { status: 500 })
    }
}
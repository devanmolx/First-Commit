import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized", status: false }, { status: 401 })
    }

    const body = await req.json();
    const { projectId } = body;

    try {

        await prisma.userProject.delete({
            where: {
                userId_projectId: {
                    userId: session.user.id,
                    projectId: projectId,
                }
            }
        })

        return NextResponse.json({ msg: "Project Unfavourite", status: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong", status: false }, { status: 500 })
    }
}
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {

        const projects = await prisma.userProject.findMany({
            where: {
                userId: session.user.id
            },
            select: {
                project: {
                    include: {
                        issues: {
                            orderBy: {
                                createdAt: "desc"
                            },
                            take: 50
                        }
                    }
                }
            }
        })

        const flatProjects = projects.map(p => p.project)

        return NextResponse.json({ projects: flatProjects, status: true })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error", status: false }, { status: 500 })
    }
}
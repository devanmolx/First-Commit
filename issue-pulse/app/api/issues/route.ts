import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { IssueType } from "@/types/types";

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized", status: false }, { status: 401 })
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const page = parseInt(url.searchParams.get("page") || "1");

    const start = (page - 1) * limit;
    const end = start + limit;


    const favProjects = await prisma.userProject.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            project: {
                include: {
                    issues: true
                }
            }
        }
    })

    const issues: IssueType[] = [];

    favProjects.flatMap(project => issues.push(...project.project.issues))
    issues.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    const paginatedIssues = issues.slice(start, end);

    return NextResponse.json({ issues: paginatedIssues, status: true })
}
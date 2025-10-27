import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { githubRepoExists } from "@/lib/githubRepoExists";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    let { projectUrl } = body;

    projectUrl = projectUrl.split("github.com/")[1];

    const exists = await githubRepoExists(projectUrl);

    console.log(exists)

    if (!exists) {
        return NextResponse.json({ error: "Repo does not exist on GitHub", status: false }, { status: 404 });
    }


    let project;

    project = await prisma.project.findUnique({
        where: {
            url: projectUrl,
        },
        include: {
            issues: true
        }
    })

    if (!project) {
        project = await prisma.project.create({
            data: {
                url: projectUrl
            },
            include: {
                issues: true
            }
        })
    }

    const existingFavProject = await prisma.userProject.findUnique({
        where: {
            userId_projectId: {
                userId: session.user.id,
                projectId: project.id
            }
        }
    })


    if (!existingFavProject) {
        await prisma.userProject.create({
            data: {
                userId: session.user.id,
                projectId: project.id,
            }
        })
    }
    else {
        return NextResponse.json({ project, msg: "Project already added to favorites", status: false });
    }

    return NextResponse.json({ project, msg: "Project added to favorites", status: true });
}
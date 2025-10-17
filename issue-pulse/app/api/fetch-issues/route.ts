import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function GET(req: NextRequest) {

    const projects = await prisma.project.findMany({
        include: {
            issues: true
        }
    });

    for (const project of projects) {
        const res = await axios.get(`https://api.github.com/repos/${project.url}/issues?sort=created&direction=desc&per_page=50`);

        const issues = res.data.map(i => ({
            issueNo: String(i.id),
            title: i.title,
            description: i.body || "",
            createdBy: i.user?.login || "unknown",
            createdAt: new Date(i.created_at),
            tags: i.labels.map((l: any) => l.name),
            projectId: project.id
        }))

        const existingIds = project.issues.map(i => i.issueNo);
        const newIssues = issues.filter(i => !existingIds.includes(i.issueNo));

        try {
            if (newIssues.length > 0) {
                await prisma.issues.createMany({
                    data: newIssues
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return NextResponse.json({ msg: "Issues updated ✅" });

}
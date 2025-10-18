import prisma from "@/lib/prisma";
import { IssueType } from "@/types/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {

    const projects = await prisma.project.findMany({
        include: {
            issues: true
        }
    });

    await Promise.all(projects.map(async (project) => {
        try {
            const res = await axios.get(
                `https://api.github.com/repos/${project.url}/issues?sort=created&direction=desc&per_page=50`,
            );

            const issues = res.data.map((i: any) => ({
                issueNo: String(i.id),
                title: i.title,
                description: i.body || "",
                createdBy: i.user?.login || "unknown",
                createdAt: new Date(i.created_at),
                tags: i.labels.map((l: any) => l.name),
                projectId: project.id
            }));

            const existingIds = project.issues.map(i => i.issueNo);
            const newIssues = issues.filter((i: IssueType) => !existingIds.includes(i.issueNo));

            if (newIssues.length > 0) {
                await prisma.issues.createMany({
                    data: newIssues,
                    skipDuplicates: true,
                });
            }
        } catch (error) {
            console.error(`Error fetching issues for project ${project.id}:`, error);
        }
    }));

    return NextResponse.json({ msg: "Issues updated", status: true });

}
import prisma from "@/lib/prisma";
import { GitHubIssue } from "@/types/types";
import axios from "axios";
import { NextResponse } from "next/server";

async function batchPromises<T>(
    items: T[],
    batchSize: number,
    callback: (item: T) => Promise<void>
): Promise<void> {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await Promise.all(batch.map(callback));
    }
}

export async function GET() {
    const projects = await prisma.project.findMany({
        include: {
            issues: true
        }
    });

    await batchPromises(projects, 5, async (project) => {
        try {

            const res = await axios.get<GitHubIssue[]>(
                `https://api.github.com/repos/${project.url}/issues?sort=created&direction=desc&per_page=50`,
                {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_TOKEN}`
                    }
                }
            );

            const issues = res.data
                .filter((i) => !i.pull_request)
                .map((i) => ({
                    issueNo: i.number,
                    title: i.title,
                    description: i.body || "",
                    repoUrl: project.url,
                    url: i.html_url,
                    createdBy: i.user?.login || "unknown",
                    createdAt: new Date(i.created_at),
                    tags: i.labels.map((l) => l.name),
                    projectId: project.id
                }));

            const existingIds = project.issues.map(i => i.issueNo);
            const newIssues = issues.filter((i) => !existingIds.includes(i.issueNo));

            if (newIssues.length > 0) {
                await prisma.issue.createMany({
                    data: newIssues,
                    skipDuplicates: true,
                });
            }
        } catch (error) {
            console.error(`Error fetching issues for project ${project.id}:`, error);
        }
    });

    return NextResponse.json({ msg: "Issues updated", status: true });
}
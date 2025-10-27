import { buildMetadata } from '@/lib/buildMetaData';
import prisma from '@/lib/prisma'
import { GitHubEvent } from '@/types/types';
import axios from 'axios';
import { NextResponse } from 'next/server';

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
    const users = await prisma.user.findMany({});

    await batchPromises(users, 5, async (user) => {

        try {

            const res = await axios.get<GitHubEvent[]>(`https://api.github.com/users/${user.username}/events`, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            })

            const activities = res.data.map((event: GitHubEvent) => {
                let action = "";
                let details = "";

                switch (event.type) {
                    case "PushEvent":
                        action = "New commit pushed";
                        details = `Branch: ${event.payload.ref?.replace("refs/heads/", "") ?? "unknown"}`;
                        break;

                    case "PullRequestEvent":
                        if (event.payload.pull_request) {
                            action = `PR #${event.payload.pull_request.number} ${event.payload.action ?? ""}`;
                            details = event.payload.pull_request.title ?? "No title";
                        } else {
                            action = "Pull Request Event";
                            details = "No pull request data";
                        }
                        break;

                    case "IssuesEvent":
                        if (event.payload.issue) {
                            action = `Issue #${event.payload.issue.number} ${event.payload.action ?? ""}`;
                            details = event.payload.issue.title ?? "No title";
                        } else {
                            action = "Issue Event";
                            details = "No issue data";
                        }
                        break;

                    case "CreateEvent":
                        action = `Created ${event.payload.ref_type ?? "unknown"}`;
                        details = event.payload.ref ?? "N/A";
                        break;

                    case "DeleteEvent":
                        action = `Deleted ${event.payload.ref_type ?? "unknown"}`;
                        details = event.payload.ref ?? "N/A";
                        break;

                    case "ForkEvent":
                        action = "Repository forked";
                        details = "Fork created";
                        break;

                    case "WatchEvent":
                        action = "Starred repository";
                        details = "User starred the repo";
                        break;

                    default:
                        action = event.type;
                        details = "Unknown event";
                }

                return {
                    eventId: event.id,
                    userId: user.id,
                    repoName: event.repo.name,
                    repoUrl: `https://github.com/${event.repo.name}`,
                    type: event.type,
                    action,
                    details,
                    metadata: buildMetadata(event),
                    createdAt: new Date(event.created_at),
                }
            });

            await prisma.userActivity.createMany({
                data: activities,
                skipDuplicates: true,
            })

        } catch (error) {
            console.error(`Error fetching activity for user ${user.username}:`, error);
        }
    });

    return NextResponse.json({ msg: "User activity updated", status: true });
}   
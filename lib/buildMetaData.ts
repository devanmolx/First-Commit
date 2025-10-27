import { GitHubEvent } from "@/types/types";

export function buildMetadata(event: GitHubEvent) {
    const author = event.actor?.login ?? "unknown";

    switch (event.type) {
        case "PushEvent": {
            const branch = event.payload.ref?.split("/").pop() ?? "unknown";
            return {
                branch,
                author,
                commit: event.payload.head ?? "N/A",
            };
        }

        case "PullRequestEvent": {
            const pr = event.payload.pull_request;
            return {
                title: pr?.title ?? "No title",
                branch: pr?.head?.ref ?? "unknown",
                author,
                prNumber: pr?.number ?? 0,
            };
        }

        case "IssuesEvent": {
            const issue = event.payload.issue;
            return {
                title: issue?.title ?? "No title",
                state: event.payload.action ?? "unknown",
                author,
                issueNumber: issue?.number ?? 0,
            };
        }

        case "ReleaseEvent": {
            const release = event.payload.release;
            return {
                title: release?.name ?? "Untitled Release",
                tag: release?.tag_name ?? "No tag",
                author,
            };
        }

        default:
            return { author, note: "Unrecognized event type" };
    }
}

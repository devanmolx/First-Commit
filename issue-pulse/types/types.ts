export interface IssueType {
    id: number;
    issueNo: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    tags: string[];
    projectId: number;
}

interface GitHubLabel {
    name: string;
}

interface GitHubUser {
    login: string;
}

export interface GitHubIssue {
    id: number;
    title: string;
    body: string | null;
    user: GitHubUser | null;
    created_at: string;
    labels: GitHubLabel[];
}
export interface IssueType {
    id: number;
    issueNo: number;
    title: string;
    description?: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    url: string;
    repoUrl: string;
    projectId: number;
}


interface GitHubLabel {
    name: string;
}

interface GitHubUser {
    login: string;
}

export interface GitHubIssue {
    number: number;
    title: string;
    body: string | null;
    user: GitHubUser | null;
    html_url: string
    created_at: string;
    labels: GitHubLabel[];
}

export interface UserType {
    id: number
    name?: string | null
    email?: string | null
    image?: string | null
}

export interface UserContextType {
    user: UserType | undefined,
    setUser: (user: UserType | undefined) => void
}

export interface ProjectType {
    id: number,
    url: string,
    description: string | undefined,
    issues: IssueType[]
}

export interface ProjectContextType {
    projects: ProjectType[],
    setProjects: (projects: ProjectType[]) => void
}

export interface IssueContextType {
    issues: IssueType[],
    setIssues: (issues: IssueType[]) => void
}
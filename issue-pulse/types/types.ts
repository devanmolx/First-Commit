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

export interface UserType {
    id: number
    name: string
    email: string
    image: string
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
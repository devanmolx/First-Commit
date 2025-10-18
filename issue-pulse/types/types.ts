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
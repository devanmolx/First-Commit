import { IssueContextType } from "@/types/types";
import { createContext } from "react";

const defauleIssueContext: IssueContextType = {
    issues: [],
    setIssues: () => { },
    fetchIssues: () => { }
}

export const IssueContext = createContext<IssueContextType>(defauleIssueContext);
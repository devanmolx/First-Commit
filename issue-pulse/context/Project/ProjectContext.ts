import { ProjectContextType, ProjectType } from "@/types/types";
import { createContext } from "react";

const defaultProjectContext: ProjectContextType = {
    projects: [],
    setProjects: () => { }
}

export const ProjectContext = createContext<ProjectContextType>(defaultProjectContext);
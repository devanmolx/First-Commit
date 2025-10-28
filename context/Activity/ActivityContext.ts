import { ActivityContextType } from "@/types/types";
import { createContext } from "react";

const defaultActivityContext : ActivityContextType = {
    activities: [],
    setActivities: () => { }
}

export const ActivityContext = createContext<ActivityContextType>(defaultActivityContext);
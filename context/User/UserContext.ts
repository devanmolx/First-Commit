import { UserContextType } from "@/types/types";
import { createContext } from "react";

const defaultUserContext: UserContextType = {
    user: undefined,
    setUser: () => { }
}

export const UserContext = createContext<UserContextType>(defaultUserContext);
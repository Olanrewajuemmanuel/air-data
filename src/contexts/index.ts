import { createContext } from "react";
import { User } from "../types/types";

export const UserContext = createContext<User | null>(null);

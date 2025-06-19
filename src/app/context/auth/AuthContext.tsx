import { createContext } from "react";
import { IUser } from "@/interfaces/IUser";
//import { IRespuestaApiAuth } from "@/interfaces/IRespuestaApiAuth";

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    //firmas
    //loginUser: (data: { email: string; password: string }) => Promise<boolean>;
    loginUser: (data: { email: string; password: string }) => Promise<IUser | null>;
    registerUser: (data: { email: string; password: string; fullName: string }) => Promise<{ hasError: boolean; message: string }>;

    logout: () => void;
}

export const AuthContext = createContext( {} as ContextProps );
export interface IUser {
    id?: number;
    email: string;
    username: string;
    password: string;
    isActive?: boolean;
    token?: string;
    /*roles?: string[];*/
    logo?: string;
    /*instagram?: string;*/
}

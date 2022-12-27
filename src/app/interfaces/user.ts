export interface User {
    username?: string;
    email: string;
    password: string;
    bio?: string;
    token?: string;
    image?: string;
}

export type UserRequest = Record<string, User>

export interface UserProfile {
    fullName: string;
    photoLink: string;
    datePublication: string;
    topic: string;
    message: string;
    likes: number;
}

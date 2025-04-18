
export interface User {
    id: string;
    username?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface Profile {
    id: string;
    userId: string;
    name: string;
    bio?: string;
    headline?: string;
    photo?: string;
    interests: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

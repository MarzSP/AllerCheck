export type User = {
    userId: number;
    username: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}
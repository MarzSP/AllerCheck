export interface Tag {
    tagId: number;
    userId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}
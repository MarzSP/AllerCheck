export type CreateMenuDTO = {
    userId: number;
    name: string;
    description?: string | null;
    isActive?: boolean;
};

export type UpdateMenuDTO = {
    name?: string;
    description?: string | null;
    isActive?: boolean;
};

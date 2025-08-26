export type MenuItem = {
    menuItemId: number;
    menuId: number;
    name: string;
    description: string | null;
    price: number;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}
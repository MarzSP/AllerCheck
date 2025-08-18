/**
 *  Domain model for Menu
 */
export interface Menu {
    menuId: number;
    userId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

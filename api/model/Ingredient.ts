export interface Ingredient {
    ingredientId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
    userId: number;
    imageUrl?: string | null; // Optional field for image URL
}
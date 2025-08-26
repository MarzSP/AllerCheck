export type Ingredient = {
    ingredientId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
    imageUrl: string | null;
}
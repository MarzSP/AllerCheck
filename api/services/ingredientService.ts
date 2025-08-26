/**
 * TODO:
 * CHECK:
 * Incorporate Tag logic into Ingredient logic?
 * Check imageUrl handling? (put in type or take out?)
 *
 */
import {IngredientRepository, ingredientRepository} from "../repositories/ingredientRepository";
import {Ingredient} from "../types/Ingredient";
import {ValidationError} from "../utils/errors";
import {validateDescription, validateName} from "../utils/validation";

export class IngredientService {
    constructor(private readonly repo: IngredientRepository = ingredientRepository) {
    }

    async getAllIngredients(): Promise<Ingredient[]> {
        return this.repo.findAll();
    }

    async getIngredientById(ingredientId: number): Promise<Ingredient> {
        if (!Number.isInteger(ingredientId) || ingredientId <= 0) {
            throw new ValidationError("Invalid ingredient ID");
        }

        const ingredient = await this.repo.findById(ingredientId);
        if (!ingredient) {
            throw new ValidationError("Ingredient not found");
        }
        return ingredient;
    }

    async createIngredient(
        data: Pick<Ingredient, "name" | "description" | "isActive">
    ): Promise<Ingredient> {
        const name = validateName(data.name);
        const description = validateDescription(data.description);
        return this.repo.insert({
            ...data, name, description,
            imageUrl: undefined
        });
    }

    async updateIngredient(
        ingredientId: number,
        patch: Partial<Omit<Ingredient, "ingredientId" | "createdAt">>
    ): Promise<Ingredient> {
        if (!Number.isInteger(ingredientId) || ingredientId <= 0) {
            throw new ValidationError("Invalid ingredient ID");
        }

        // Only validate fields that are there (also empty string)
        const name =
            patch.name !== undefined ? validateName(patch.name) : undefined;
        const description =
            patch.description !== undefined
                ? validateDescription(patch.description)
                : undefined;

        const updated = await this.repo.update(ingredientId, {
            ...patch,
            name,
            description,
        });

        if (!updated) throw new ValidationError("Ingredient not found");
        return updated;
    }

    async deleteIngredient(ingredientId: number): Promise<void> {
        if (!Number.isInteger(ingredientId) || ingredientId <= 0) {
            throw new ValidationError("Invalid ingredient ID");
        }
        await this.repo.delete(ingredientId);
    }
}

export const ingredientService = new IngredientService();

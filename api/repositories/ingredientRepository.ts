import {pool} from "../db";
import {Ingredient} from "../types/Ingredient";

export class IngredientRepository {

    /**
     * Fetch all ingredients
     */
    async findAll(): Promise<Ingredient[]> {
        const {rows} = await pool.query<Ingredient>(`
            SELECT ingredient_id AS "ingredientId",
                   name,
                   description,
                   is_active     AS "isActive",
                   updated_at    AS "updatedAt",
                   created_at    AS "createdAt"
            FROM ingredient
            ORDER BY name ASC
        `);
        return rows;
    }

    /**
     * Fetch a single ingredient by IngredientId
     */
    async findById(ingredientId: number): Promise<Ingredient | null> {
        const {rows} = await pool.query<Ingredient>(`
            SELECT ingredient_id AS "ingredientId",
                   name,
                   description,
                   is_active     AS "isActive",
                   updated_at    AS "updatedAt",
                   created_at    AS "createdAt"
            FROM ingredient
            WHERE ingredient_id = $1
        `, [ingredientId]);
        return rows[0] ?? null;
    }

    /**
     * Insert a new ingredient
     */
    async insert(data: Pick<Ingredient, "name" | "description" | "isActive" | "imageUrl">): Promise<Ingredient> {
        const {rows} = await pool.query<Ingredient>(`
            INSERT INTO ingredient (name, description, is_active)
            VALUES ($1, $2, COALESCE($3, TRUE), $4)
            RETURNING ingredient_id AS "ingredientId",
                name,
                description,
                is_active AS "isActive",
                updated_at AS "updatedAt",
                created_at AS "createdAt"
        `, [data.name, data.description ?? null, data.isActive ?? true, data.imageUrl ?? null]);
        return rows[0];
    }

    /**
     * Update fields of an ingredient by ingredientId
     */
    async update(
        ingredientId: number,
        patch: Partial<Omit<Ingredient, "ingredientId" | "createdAt">>
    ): Promise<Ingredient | null> {
        const {name, description, isActive, imageUrl} = patch;

        const {rows} = await pool.query<Ingredient>(`
            UPDATE ingredient
            SET name        = COALESCE($2, name),
                description = COALESCE($3, description),
                is_active   = COALESCE($4, is_active),
                updated_at  = NOW()
            WHERE ingredient_id = $1
            RETURNING ingredient_id AS "ingredientId",
                name,
                description,
                is_active AS "isActive",
                updated_at AS "updatedAt",
                created_at AS "createdAt"
        `, [
            ingredientId,
            name ?? null,
            description ?? null,
            (isActive as boolean | null) ?? null
        ]);

        return rows[0] ?? null;
    }

    /**
     * Delete an ingredient by ingredientId
     */
    async delete(ingredientId: number): Promise<void> {
        await pool.query(`
            DELETE
            FROM ingredient
            WHERE ingredient_id = $1
        `, [ingredientId]);
    }
}

export const ingredientRepository = new IngredientRepository();
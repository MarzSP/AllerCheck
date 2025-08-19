// repositories/MenuRepository.ts
import {pool} from '../db';
import {Menu} from "../types/Menu";

/**
 * Postgres implementation of IMenuRepository
 * Uses a shared pg Pool instance for database queries.
 */
export class MenuRepository {

    /**
     * Executes SELECT query to fetch all menus.
     * @returns Array of menu rows (raw DB objects)
     */
    async getMenusByUserId(userId: number): Promise<Menu[]> {
        const {rows} = await pool.query<Menu>(`
            SELECT menu_id    AS "menuId",
                   user_id    AS "userId",
                   name,
                   description,
                   is_active  AS "isActive",
                   updated_at AS "updatedAt",
                   created_at AS "createdAt"
            FROM menu
            WHERE user_id = $1
        `, [userId]);
        return rows;
    }

    /**
     * Executes SELECT query to fetch a menu by ID.
     * @param menuId - The unique identifier of the menu
     * @returns Menu.ts row if found, otherwise null
     */
    async getMenuById(menuId: number) {
        const result = await pool.query(
            `SELECT menuId, userId, name, description, isActive, updated_at, created_at
             FROM menu
             WHERE menuId = $1`,
            [menuId]
        );
        return result.rows[0] ?? null;
    }

    /**
     *
     * @param data
     */
    async create(data: Pick<Menu, "userId" | "name" | "description" | "isActive">): Promise<Menu> {
        const {rows} = await pool.query<Menu>(`
            INSERT INTO menu (user_id, name, description, is_active)
            VALUES ($1, $2, $3, $4) RETURNING menu_id AS "menuId", user_id AS "userId", name, description,
                is_active AS "isActive", updated_at AS "updatedAt", created_at AS "createdAt"
        `, [data.userId, data.name, data.description, data.isActive ?? true]);
        return rows[0];
    }

    /**
     *
     * @param menuId
     * @param patch
     */
    async update(menuId: number, patch: Partial<Omit<Menu, "menuId" | "userId" | "createdAt">>): Promise<Menu | null> {
        const {name, description, isActive} = patch;
        const {rows} = await pool.query<Menu>(`
            UPDATE menu
            SET name        = COALESCE($2, name),
                description = COALESCE($3, description),
                is_active   = COALESCE($4, is_active),
                updated_at  = NOW()
            WHERE menu_id = $1 RETURNING menu_id AS "menuId", user_id AS "userId", name, description,
                is_active AS "isActive", updated_at AS "updatedAt", created_at AS "createdAt"
        `, [menuId, name ?? null, description ?? null, isActive as boolean | null ?? null]);
        return rows[0] ?? null;
    }

    /**
     *
     * @param menuId
     */
    async delete(menuId: number): Promise<void> {
        await pool.query(`DELETE
                          FROM menu
                          WHERE menu_id = $1`, [menuId]);
    }
}

export const menuRepository = new MenuRepository();

// repositories/MenuRepository.ts
import {pool} from '../db';
import {IMenuRepository} from "./iMenuRepository";

/**
 * Postgres implementation of IMenuRepository
 * Uses a shared pg Pool instance for database queries.
 */
export class MenuRepository implements IMenuRepository {

    /**
     * Executes SELECT query to fetch all menus.
     * @returns Array of menu rows (raw DB objects)
     */
    async getMenu() {
        console.log('Model: querying all menus');
        try {
            const result = await pool.query(`
                SELECT menuId, userId, name, description, isActive, updated_at, created_at
                FROM menu
            `);
            console.log('Query succeeded, rows:', result.rows.length);
            return result.rows;
        } catch (err) {
            console.error('DB query failed:', err);
            throw err;
        }
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
}

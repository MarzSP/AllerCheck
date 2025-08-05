/**
 * Db operations for the menu table
 * @module menuModel
 */

import {pool} from '../db'; // assuming this exports a 'pg' Pool
/**
 * Gets all menus
 */
export const getMenu = async () => {
    console.log('🗄️  Model: querying all menus');
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
};

/**
 * Gets a menu by its menuID
 * @param menuId
 */
export const getMenuById = async (menuId: number) => {
    const result = await pool.query(
        `SELECT menuId, userId, name, description, isActive, updated_at, created_at
         FROM menu
         WHERE menuId = $1`,
        [menuId]
    );
    return result.rows[0]; // not .recordset!
};


import {poolPromise} from '../db';

/**
 * Db operations for the menu table
 * @module menuModel
 */

/**
 * Gets all menus
 */
export const getMenudb = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT menuId, userId, name, description, isActive, updated_at, created_at
        FROM menu
    `);
    return result.recordset;
};

/**
 * Gets a menu by its menuID
 * @param menuId
 */
export const getMenuByIddb = async (menuId: number) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('menuId', menuId)
        .query(
            'SELECT menuId, userId, name, description, isActive, updated_at, created_at FROM menu WHERE menuId = @menuId'
        );
    return result.recordset[0];
};

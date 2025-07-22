import {poolPromise} from '../db';

export const getMenudb = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT menuId, userId, name, description, isActive, updated_at, created_at
        FROM menu
    `);
    return result.recordset;
};

export const getMenuByIddb = async (menuId: number) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('menuId', menuId)
        .query(
            'SELECT menuId, userId, name, description, isActive, updated_at, created_at FROM menu WHERE menuId = @menuId'
        );
    return result.recordset[0];
};

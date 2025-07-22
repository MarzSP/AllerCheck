import {getMenudb, getMenuByIddb} from '../models/menuModel';

/**
 * Service to handle menu-related operations.
 */

/**
 * Fetches all menus
 */
export const getMenus = async () => {
    return await getMenudb();
};

/**
 * Fetches a menu by its menuID
 * @param menuId
 */
export const getMenusById = async (menuId: number) => {
    if (isNaN(menuId)) {
        throw new Error('Invalid menu ID');
    }
    const menu = await getMenuByIddb(menuId);
    if (!menu) {
        throw new Error('Menu not found');
    }
    return menu;
};
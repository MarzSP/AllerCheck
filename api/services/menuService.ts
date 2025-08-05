import {getMenu, getMenuById} from '../models/menuModel';

/**
 * Service to handle menu-related operations.
 */

/**
 * Fetches all menus
 */
export const getMenus = async () => {
    console.log('Service: getMenus called');

    return await getMenu();
};

/**
 * Fetches a menu by its menuID
 * @param menuId
 */
export const getMenusById = async (menuId: number) => {
    if (isNaN(menuId)) {
        throw new Error('Invalid menu ID');
    }
    const menu = await getMenuById(menuId);
    if (!menu) {
        throw new Error('Menu not found');
    }
    return menu;
};
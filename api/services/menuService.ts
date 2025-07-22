import {getMenudb, getMenuByIddb} from '../models/menuModel';

export const getMenus = async () => {
    return await getMenudb();
};

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
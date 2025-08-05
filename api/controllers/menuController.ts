import {Request, Response} from 'express';
import {getMenus, getMenusById} from '../services/menuService';

/**
 * Fetch all menus
 * @param req
 * @param res
 */
export const getMenu = async (req: Request, res: Response) => {
    try {
        console.log('Controller: getMenu called');
        const menus = await getMenus();
        res.json(menus);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch menus'});
    }
};

/**
 * Fetch a menu by menuID
 * @param req
 * @param res
 */
export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menuId = parseInt(req.params.id, 10);

        const menu = await getMenusById(menuId);
        res.json(menu);
    } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === 'Invalid menu ID') {
            return res.status(400).json({error: err.message});
        }
        if (err instanceof Error && err.message === 'Menu not found') {
            return res.status(404).json({error: err.message});
        }
        res.status(500).json({error: 'Failed to fetch menu'});
    }
};

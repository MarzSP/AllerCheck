import {Request, Response} from "express";
import {menuService} from "../services/menuService";

/** Controller for handling menu-related requests.
 * This controller interacts with the menuService to perform operations
 * @param _req
 * @param res
 */

export const getMenu = async (_req: Request, res: Response) => {
    try {
        const menus = await menuService.getMenus();
        res.json(menus);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch menus"});
    }
};

export const getMenusById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const menu = await menuService.getMenusById(id);
        res.json(menu);
    } catch (err: any) {
        if (err?.message === "Invalid menu ID") return res.status(400).json({error: err.message});
        if (err?.message === "Menu not found") return res.status(404).json({error: err.message});
        res.status(500).json({error: "Failed to fetch menu"});
    }
};

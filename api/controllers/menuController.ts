import type {Request, Response, NextFunction} from "express";
import {menuService} from "../services/menuService";
import {handleError} from "../utils/errors";

/**
 * GET /api/menus/:id
 * @param req
 * @param res
 */
export async function listMenusForUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId);
        const data = await menuService.getMenusForUser(userId);
        res.json(data);
    } catch (err) {
        handleError(err, res);
    }
}

/**
 * GET  /api/menus/:id
 * @param req
 * @param res
 */
export const getMenuById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = await menuService.getMenuById(id);
        res.json(data);
    } catch (err) {
        handleError(err, res);
    }
}

/**
 * POST /api/menu
 * @param req
 * @param res
 */
export async function createMenu(req: Request, res: Response) {
    try {
        const data = await menuService.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        handleError(err, res);
    }
}

/**
 * PUT /api/menu/:id
 * @param req
 * @param res
 */
export async function updateMenu(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = await menuService.update(id, req.body);
        res.json(data);
    } catch (err) {
        handleError(err, res);
    }
}

/**
 * DELETE /api/menu/:id
 * @param req
 * @param res
 */
export async function deleteMenu(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        await menuService.delete(id);
        res.status(204).send();
    } catch (err) {
        handleError(err, res);
    }
}

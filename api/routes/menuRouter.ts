import {Router} from "express";
import {listMenusForUser, getMenuById} from "../controllers/menuController";

const router = Router();

// GET /api/users/:userId/menus
router.get("/users/:userId/menus", listMenusForUser);

// GET /api/menus/:id
router.get("/menus/:id", getMenuById);

export default router;

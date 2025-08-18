import {Router} from 'express';
import {getMenu, getMenuById} from '../controllers/menuController';

/**
 * Menu.ts Router
 */
const router = Router();
console.log('📦 Router loaded');
router.get('/', getMenu);
router.get('/:id', getMenuById);

export default router;

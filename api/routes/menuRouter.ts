import {Router} from 'express';
import {getMenu, getMenusById} from '../controllers/menuController';

/**
 * Menu.ts Router
 */
const router = Router();
console.log('📦 Router loaded');
router.get('/', getMenu);
router.get('/:id', getMenusById);

export default router;

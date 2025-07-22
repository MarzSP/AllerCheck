import {Router} from 'express';
import {getMenu, getMenuById} from '../controllers/menuController';

/**
 * Menu Router
 */
const router = Router();

router.get('/', getMenu);
router.get('/:id', getMenuById);

export default router;

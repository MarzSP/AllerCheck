import {Router} from 'express';
import {getMenu, getMenuById} from '../controllers/menuController';

const router = Router();

router.get('/', getMenu);
router.get('/:id', getMenuById);

export default router;

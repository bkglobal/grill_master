import { Router } from 'express';
import routes from './app';

const router = Router();

router.use('/', routes);

export default router;

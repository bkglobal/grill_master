import { Router } from 'express';
import appController from './app.controller';
const router = Router();

router.get('/', appController.renderGrill.bind(appController));
router.post('/saveGrill', appController.saveGrillData.bind(appController));
router.get('/test', appController.myfunc);

export default router;

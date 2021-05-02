import { Router } from 'express';
import appController from './app.controller';
const router = Router();

// @GET Display main page
router.get('/', appController.renderGrill.bind(appController));

// @POST Update and save the grill data.
router.post('/saveGrill', appController.saveGrillData.bind(appController));

export default router;

import {Router} from "express";
import authInterceptor from "./auth.interceptor";
import controller from "./controller";


const router = Router();

router.post('/v1/crawl', authInterceptor, controller.crawl);

export default router;

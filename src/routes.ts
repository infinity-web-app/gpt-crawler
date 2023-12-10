import {Router} from "express";
import authInterceptor from "./auth.interceptor.js";
import controller from "./controller.js";


const router = Router();

router.post('/v1/crawl', authInterceptor, controller.crawl);

export default router;

import { Router } from "express";
import authRoutes from "./auth.routes.js";
import bookRoutes from "./book.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/book", bookRoutes);



export default router;

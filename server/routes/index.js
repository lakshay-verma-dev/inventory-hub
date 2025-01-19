import { Router } from "express";
import authRoutes from "./auth.routes.js";
import bookRoutes from "./book.routes.js";
import paymentRoutes from "./payment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/book", bookRoutes);
router.use("/payment", paymentRoutes);


export default router;

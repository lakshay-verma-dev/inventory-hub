import { Router } from "express";

const paymentRoutes = Router();

paymentRoutes.post("/Payment-checkout", paymentSession);

export default paymentRoutes;

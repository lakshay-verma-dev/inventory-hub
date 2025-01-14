import { Router } from "express";
import { paymentSession } from "../controllers/payment.controllers.js";

const paymentRoutes = Router();

paymentRoutes.post("/Payment-checkout", paymentSession);

export default paymentRoutes;

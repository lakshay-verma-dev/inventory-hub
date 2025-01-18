import Router from "express";
const cartRouter = Router();
import { saveCart, getCart } from "../controllers/cart.controllers.js";

cartRouter.post("/save-cart", saveCart);
cartRouter.get("/get-cart/:email", getCart);

export default cartRouter;
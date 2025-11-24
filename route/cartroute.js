import { Router } from "express";
import { addToCartItemController } from "../controllers/cartcontroller.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.post('/add', auth, addToCartItemController);

export default cartRouter;

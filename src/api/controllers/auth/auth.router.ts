import { Router } from "express";
import { getJWT } from "./auth.controller";

export const authRouter = Router();
authRouter.get('/get-token', getJWT);

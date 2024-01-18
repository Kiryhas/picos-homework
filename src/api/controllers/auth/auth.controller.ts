import { NextFunction, Request, Response } from "express";
import { JWTService } from "../../../services";

export const getJWT = (req: Request, res: Response) => {
    const jwt = JWTService.getToken();

    res.status(200);
    res.json({
        token: jwt
    });
};

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        res.status(403);
        return res.end();
    }

    const token = tokenHeader.split(' ')[1];
    const isValid = await JWTService.validateToken(token);
    if (!isValid) {
        res.status(403);
        return res.end();
    }

    next();
}

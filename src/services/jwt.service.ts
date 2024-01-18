import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET!;

export default class JWTService {
    static getToken = () => {
        return jwt.sign({}, SECRET, { expiresIn: '1h' });
    }

    static validateToken = (token: string) => {
        return new Promise<boolean>((resolve, reject) => {
            jwt.verify(token, SECRET, (err, _) => {
                if (err) {
                    return resolve(false);
                }

                resolve(true);
            });
        })
    }
}

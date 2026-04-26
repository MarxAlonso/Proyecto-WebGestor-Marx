import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);
    if (!decoded || !decoded.sub) {
        return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = {
      userId: decoded.sub,
      email: decoded.email
    };
    next();
  });
};

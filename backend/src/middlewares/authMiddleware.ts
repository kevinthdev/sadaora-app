import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "sadaora_app_super_secret";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authReq = req as AuthRequest;

  const authHeader = authReq.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }
  const token = authHeader?.split(" ")[1]?.replace(/"/g, "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (authReq as any).user = decoded;

    if (!authReq.user || !authReq.user.id) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }
    authReq.userId = authReq.user.id;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

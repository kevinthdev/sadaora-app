import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sadaora_app_super_secret";

export const generateToken = (userId: string, email: string): string => {
  return jwt.sign({ id: userId, email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

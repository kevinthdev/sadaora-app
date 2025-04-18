import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "../utils/comparePassword";
import { hashPassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ error: "Email already registered." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const newProfile = await prisma.profile.create({
      data: {
        name,
        headline: "",
        bio: "",
        user: {
          connect: { id: newUser.id },
        },
      },
    });

    const token: string = generateToken(newUser.id, newUser.email);
    res.status(200).json({
      message: "Login successful",
      token,
      id: newUser.id,
      name: newProfile?.name || name,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: "User does not exsit" });
    } else {
      const isPasswordValid: boolean = await comparePasswords(
        password,
        user.password
      );

      if (!isPasswordValid) {
        res.status(401).json({ error: "Something went wrong" });
      }
      const token: string = generateToken(user.id, user.email);

      const profile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      res.status(200).json({
        message: "Login successful",
        token,
        id: user.id,
        name: profile?.name || "",
      });
    }
  } catch (error) {
    next(error);
  }
};

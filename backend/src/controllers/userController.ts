import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../../types/auth";
import { Profile } from "../../types/user";

const prisma = new PrismaClient();

export const createProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, bio, headline, photo, interests } = req.body;
  const userId = req.userId;

  try {
    const profile = await prisma.profile.create({
      data: {
        name,
        bio,
        headline,
        photo,
        interests,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ profile });
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, bio, headline, photo, interests } = req.body;
  const userId = req.userId;

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        name,
        bio,
        headline,
        photo,
        interests,
      },
    });

    res.status(200).json({ profile: updatedProfile });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const deleteProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    await prisma.profile.delete({
      where: { userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ error: "Failed to delete profile" });
  }
};

export const getPublicFeed = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { search = "", page = 1, pageSize = 5 } = req.query;

  try {
    const filter = {
      userId: { not: userId },
      OR: [
        { name: { contains: String(search) } },
        { bio: { contains: String(search) } },
        { headline: { contains: String(search) } },
        { interests: { contains: String(search) } },
      ],
    };

    const totalCount = await prisma.profile.count({
      where: filter,
    });

    const feed = await prisma.profile.findMany({
      where: filter,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      feed,
      total: totalCount,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (error) {
    console.error("Error fetching public feed:", error);
    res.status(500).json({ error: "Failed to fetch public feed" });
  }
};

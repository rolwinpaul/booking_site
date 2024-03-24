//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req:Request,res:Response) => {
  try {
    const availableSlots = await prisma.booking.findMany({
      where: {
        time: {
          gte: new Date(), // Filter for future slots
        },
      },
      orderBy: {
        time: "asc",
      },
    });
    res.status(200).json(availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

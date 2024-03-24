import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
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
    NextResponse.json(
      { json: availableSlots},
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

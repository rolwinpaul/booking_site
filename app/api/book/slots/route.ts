import prisma from '@/prisma';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { date } = await req.json();

    // Check if date is a valid date string
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    // Calculate start and end times for the selected date
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch bookings for the selected date
    const bookings = await prisma.booking.findMany({
      where: {
        time: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        time: 'asc',
      },
    });

    // Check if bookings exist for both time slots (9:30 AM and 1:30 PM)
    const bookedSlots = bookings.map(booking => booking.time.getHours());
    const availableSlots = [];

    if (!bookedSlots.includes(9)) {
      availableSlots.push({
        date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 30, 0),
        slot: '9:30 AM - 1:30 PM'
      });
    }

    if (!bookedSlots.includes(13)) {
      availableSlots.push({
        date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 13, 30, 0),
        slot: '1:30 PM - 5:30 PM'
      });
    }

    return NextResponse.json(
      { json: availableSlots },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

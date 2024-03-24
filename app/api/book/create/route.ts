import prisma from '@/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export const POST = async (req: NextRequest) => {
  try {
    // // Parse the request body to extract the necessary data
    const { time, testNumber, gstNumber, email } = await req.json();

    // Validate the incoming data
    if (!time || !testNumber || !gstNumber || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new booking record in the database using Prisma
    const booking = await prisma.booking.create({
      data: {
        time: new Date(time), // Assuming time is provided as a string in ISO format
        testNumber: parseInt(testNumber), // Convert to integer
        gstNumber,
        email, // Use the authenticated user's ID
      },
    });

    // Return a success response with the created booking
    return NextResponse.json(
      { booking },
      { status: 201 } // Use 201 status code for successful creation
    );
  } catch (error) {
    console.error(error);
    // Return an error response if any errors occur during the process
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Disconnect from the Prisma client
    await prisma.$disconnect();
  }
};

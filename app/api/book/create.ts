//@ts-nocheck
import { getSession } from 'next-auth/client';
import prisma from '@/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { time, testNumber } = req.body;

  try {
    // Check if the requested slot is available
    // You may need to adjust this logic depending on how your slots are stored in the database
    const existingBooking = await prisma.booking.findFirst({
      where: {
        time,
        testNumber,
      },
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Slot already booked' });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        time,
        testNumber,
        userId: session.user.id,
      },
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


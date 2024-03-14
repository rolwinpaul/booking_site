//@ts-nocheck

import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/helpers/server-helpers';
import prisma from '@/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const bookingId = req.body.bookingId;

  try {
    // Check if the booking exists
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Ensure the booking belongs to the current user
    if (booking.userId !== session.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Delete the booking
    await connectToDatabase();
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return res.status(204).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}

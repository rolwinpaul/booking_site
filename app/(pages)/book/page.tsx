"use client"
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";

interface Slot {
  date: Date;
  slot: string;
}

const Book = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        if (!selectedDate) return; // Do nothing if selectedDate is null

        const response = await fetch("/api/book/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: selectedDate.toISOString() }),
        });

        if (!response.ok) {
          throw new Error("Failed to get slots");
        }

        const responseData = await response.json();
        setSlots(responseData.json);
      } catch (error) {
        console.error("Error booking slot:", error);
      }
    };

    fetchSlots(); // Fetch slots when selectedDate changes
  }, [selectedDate]);

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl">Book a Slot</h1>
      <form
        className="bg-blue-50 p-6 rounded-lg mt-10 flex flex-col gap-4 mx-8"
        action=""
      >
        <fieldset className="flex bg-blue-100 w-full h-full  p-3 rounded-xl items-center justify-between">
          <label htmlFor="timing" className="font-bold ">
            Select Timing
          </label>
          <select className="p-2 rounded-xl bg-white" name="timing" id="timing">
            {slots.map((slot, index) => (
              <option key={index} value={slot.date.toISOString()}>
                {slot.slot}
              </option>
            ))}
          </select>
        </fieldset>
        <Calendar onDateSelect={handleDateSelection} />
        <button
          className="bg-black text-white w-full p-2 rounded-lg mt-16"
          onClick={() => console.log(slots)}
        >
          Book
        </button>
      </form>
    </main>
  );
};

export default Book;

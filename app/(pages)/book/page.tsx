"use client"
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import {useSession } from "next-auth/react";

interface Slot {
  date: Date;
  slot: string;
}

const Book = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null); // State to manage selected slo
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTest, setSelectedTest] = useState<number>(1); // Initialize selectedTest with the first test number
  const [gstNumber, setGstNumber] = useState<string>("");
  const { data } = useSession();

  const testNames = [
    "ESD IEC 61000-4-2",
    "EFT IEC 61000-4-4",
    "SURGE IEC 61000-4-5",
    "CS IEC 61000-4-6",
    "PFS IEC 61000-4-11/29",
    "CE CISPR 11-22",
    "RE EN 55022- Class-B",
    "RS IEC 61000-4-3",
  ];

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
  useEffect(() => {
    // Select the first slot if slots exist and no slot is selected
    if (slots.length > 0 && !selectedSlot) {
      setSelectedSlot(slots[0]);
    }
  }, [slots, selectedSlot]);
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };
  const handleSlotSelection = (index: number) => {
    setSelectedSlot(slots[index]);
  };

  const handleBooking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior
      const response = await fetch("/api/book/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: selectedSlot?.date,
          testNumber: selectedTest,
          gstNumber: gstNumber,
          email: data?.user?.email
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book slot");
      }

      // Handle success, e.g., display a success message
    } catch (error) {
      console.error("Error booking slot:", error);
      // Handle error, e.g., display an error message
    }
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
          <select className="p-2 rounded-xl bg-white" name="timing" id="timing"  onChange={(e) => handleSlotSelection(Number(e.target.value))}>
            {slots.map((slot, index) => (
              <option key={index} value={`${slot.date}`}>
                {slot.slot}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex bg-blue-100 w-full h-full gap-7 p-3 rounded-xl items-center justify-between">
          <label htmlFor="gstNumber" className="font-bold ">
           GST Number
          </label>
          <input
            className="p-1 rounded-xl"
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex bg-blue-100 w-full h-full  p-3 rounded-xl items-center justify-between">
          <label htmlFor="test" className="font-bold ">
          Test Number
          </label>
          <select
            className="p-2 rounded-xl bg-white"
            name="test"
            id="test"
            value={selectedTest}
            onChange={(e) => setSelectedTest(parseInt(e.target.value))}
          >
            {testNames.map((testName, index) => (
              <option key={index} value={index + 1}>
                {testName}
              </option>
            ))}
          </select>
        </fieldset>

        <Calendar onDateSelect={handleDateSelection} />
        <button
          className="bg-black text-white w-full p-2 rounded-lg mt-16"
          onClick={handleBooking}
        >
          Book
        </button>
      </form>
    </main>
  );
};

export default Book;

"use client";

import React, { useState, useMemo } from "react";

interface CalendarProps {
  disabledDates?: Date[];
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ disabledDates = [], onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date); // Call the callback function with the selected date
  };
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Function to check if a date is disabled
  const isDateDisabled = (date: Date): boolean => {
    return (
      disabledDates.some(
        (disabledDate) =>
          date.getFullYear() === disabledDate.getFullYear() &&
          date.getMonth() === disabledDate.getMonth() &&
          date.getDate() === disabledDate.getDate()
      ) ||
      date.getDay() === 0 ||
      date.getDay() === 6
    );
  };

  // Function to generate days of the current month
  const generateDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const numberOfDaysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const days = [];

    // Days of the previous month
    const previousMonthLastDay = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();
    const startingIndex = startingDay === 0 ? 6 : startingDay; // Adjusted starting index for previous month's dates
    for (
      let i = previousMonthLastDay - startingIndex;
      i <= previousMonthLastDay - 1;
      i++
    ) {
      const date = new Date(currentYear, currentMonth - 1, i);
      days.push(
        <div
          key={`prev-${i}`}
          className="py-2 px-3 text-sm text-center text-gray-400 flex items-center"
        >
          {date.getDate()}
        </div>
      );
    }

    // Days of the current month
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isDisabled = isDateDisabled(currentDate);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(currentDate)}
          className={`py-2 px-3 text-sm rounded-full focus:outline-none ${
            isDisabled 
              ? "text-gray-400 cursor-not-allowed"
              : selectedDate?.getDate() == day
              ? "text-white bg-black hover:bg-gray-200"
              : "text-black hover:bg-white"
          }`}
          disabled={isDisabled}
          type="button" // Prevent form submission on click
        >
          {day}
        </button>
      );
    }

    // Determine if we need to display additional rows for the next month
    const totalDaysDisplayed = startingIndex + numberOfDaysInMonth;
    const totalRowsNeeded = Math.ceil(totalDaysDisplayed / 7);
    // Days of the next month (if needed to fill the remaining rows)
    const daysNextMonth = totalRowsNeeded * 7 - totalDaysDisplayed;
    for (let i = 1; i <= daysNextMonth; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push(
        <div
          key={`next-${i}`}
          className=" py-2 px-3 text-sm text-center  text-gray-400 flex items-center"
        >
          {date.getDate()}
        </div>
      );
    }

    return days;
  }, [currentMonth, currentYear, disabledDates]);

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2 h-full">
      <div className="col-span-7 text-center  bg-blue-100 p-4 rounded-xl flex items-center justify-between font-bold mb-2">
        Selected Date
        <p className="bg-white p-2 font-normal rounded-xl">
          {" "}
          {selectedDate
            ? selectedDate.toDateString()
            : `${new Date(currentYear, currentMonth).toLocaleDateString(
                "default",
                { month: "long", year: "numeric" }
              )}`}
        </p>
      </div>

      <div className="col-span-7 bg-white p-3 rounded-xl flex justify-between items-center  mb-2">
        <button
          type="button"
          className="font-bold bg-black w-9 h-9 text-white  rounded-full"
          onClick={goToPreviousMonth}
        >
          &lt;
        </button>
        {`${new Date(currentYear, currentMonth).toLocaleDateString("default", {
          month: "long",
        })}`}
        <button
          type="button"
          className="font-bold bg-black  w-9 h-9 text-white rounded-full"
          onClick={goToNextMonth}
        >
          &gt;
        </button>
      </div>
      <div
        className="col-span-7 grid grid-cols-7 gap-2 "
        style={{ gridTemplateRows: `repeat(6, 2.5vh)` }}
      >
        <div className="text-center font-semibold">Sun</div>
        <div className="text-center font-semibold">Mon</div>
        <div className="text-center font-semibold">Tue</div>
        <div className="text-center font-semibold">Wed</div>
        <div className="text-center font-semibold">Thu</div>
        <div className="text-center font-semibold">Fri</div>
        <div className="text-center font-semibold">Sat</div>
        {generateDays}
      </div>
    </div>
  );
};

export default Calendar;

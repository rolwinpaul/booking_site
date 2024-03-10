"use client";
import React, { useState } from "react";

const TodoForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      {isFormOpen ? (
        <div className="w-screen flex items-center justify-center h-screen bg-black bg-opacity-70	 backdrop-filter backdrop-blur-8xl fixed top-0 left-0 z-20 ">
          <div className="z-25 flex flex-col gap-4 p-14 justify-center items-center bg-gray-100 rounded-lg">
          <button
                onClick={() => setIsFormOpen(!isFormOpen)}
               className="relative z-30 -right-32 -top-8 hover:bg-gray-300 w-7 h-7 rounded-full md:absolute md:top-3 md:right-9 md:bg-black md:text-white md:w-12 md:h-12 md:rounded-full"
              >
                x
              </button>
            <h1 className="text-xl font-bold w-full align-middle text-slate-700 flex ">
              Add Todo
            </h1>
            <input
              className="rounded-md w-full p-2"
              type="text"
              placeholder="title"
            />
            <textarea
              className="rounded-md w-full p-2 resize-none"
              rows={5}
              placeholder="description"
            />

            <button className="w-full mt-7 bg-green-600 hover:bg-green-400 text-white p-5 rounded-lg">
              {" "}
              Submit
            </button>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="bg-black fixed bottom-10 right-5 w-10 h-10 text-3xl lg:bottom-20 lg:right-10 lg:w-16 lg:h-16 lg:text-6xl rounded-full text-white flex  hover:bg-gray-600 items-center lg:items-start justify-center "
      >
        +
      </button>
    </>
  );
};

export default TodoForm;

import Calendar from "@/components/Calendar";

const book = () => {
  return (
    <main className="flex flex-col justify-center items-center h-full ">
      <h1 className="text-4xl">Book a Slot</h1>
      <form className="bg-blue-50 p-6 rounded-lg mt-10 flex flex-col gap-4 mx-8" action="">
        <fieldset className="flex bg-blue-100 w-full h-full  p-3 rounded-xl items-center justify-between">
          <label htmlFor="timing" className="font-bold ">Select Timing</label>
          <select  className="p-2 rounded-xl" name="timing" id="timing">
            <option className="p-2" value="1">9:30-1:30</option>
            <option className="p-2" value="2">1:30-5:30</option>
          </select>
        </fieldset>
        <Calendar/>
       <button className="bg-black text-white w-full p-2 rounded-lg mt-16">Book</button>
      </form>
       
    </main>
  );
};

export default book;

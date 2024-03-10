"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const logouthandler = async () => {
    await signOut();
  };
  const { data, status } = useSession();

  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    // <>
    //   Desktop navbar
    //   <nav className="hidden w-full backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 px-10 py-4 lg:flex sticky top-0 z-10 items-center justify-between border-b border-gray-200">
    //     <Link className=" hover:text-gray-300" href={"/"}>
    //       <p className="font-pacifico text-4xl  flex items-center justify-center">
    //        com➕
    //       </p>
    //     </Link>
    //     <div className="text-gray-900 flex gap-10">
    //       <Link className=" hover:text-gray-500" href={"/booknow"}>
    //          Bookings
    //       </Link>
    //     </div>
    //     {status === "authenticated" ? (
    //       <div className="flex flex-col justify-center items-end">
    //         <button onClick={() => setIsAccountOpen(!isAccountOpen)}>
    //           {data.user?.image ? (
    //             <Image
    //               className="w-11 h-11 rounded-full hover:opacity-50"
    //               src={data.user.image}
    //               width={50}
    //               height={50}
    //               alt="profile-pic"
    //             />
    //           ) : (
    //             <div className="w-11 h-11 rounded-full bg-gray-300"> </div>
    //           )}
    //         </button>
    //         {isAccountOpen ? (
    //           <div className="fixed top-20 rounded-md p-4  z-10 shadow-[0_4px_10px_rgb(0,0,0,0.12)]">
    //             <div>{data.user?.name}</div>
    //             <div>{data.user?.email}</div>
    //             <button onClick={logouthandler} className="bg-red-500 mt-5 hover:bg-red-300 text-white p-3 w-full rounded-md">Log Out</button>
    //           </div>
    //         ) : null}
    //       </div>
    //     ) : (
    //       <Link
    //         className="bg-black text-white hover:bg-gray-700 rounded-md p-3"
    //         href={"/api/auth/signin"}
    //       >
    //         Login
    //       </Link>
    //     )}
    //   </nav>

    //   {/* Mobile navbar */}
    //   <nav className="lg:hidden w-full backdrop-filter backdrop-blur-lg bg-white bg-opacity-30  px-10  py-2 flex flex-col sticky top-0 z-10 items-center border-b border-gray-200">
    //     <div className="flex justify-between w-full">
    //         <button
    //           className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group"
    //           onClick={() => setIsOpen(!isOpen)}
    //         >
    //           <div
    //             className={`${genericHamburgerLine} ${
    //               isOpen
    //                 ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
    //                 : "opacity-50 group-hover:opacity-100"
    //             }`}
    //           />
    //           <div
    //             className={`${genericHamburgerLine} ${
    //               isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
    //             }`}
    //           />
    //           <div
    //             className={`${genericHamburgerLine} ${
    //               isOpen
    //                 ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
    //                 : "opacity-50 group-hover:opacity-100"
    //             }`}
    //           />
    //         </button>
    //         <Link className=" hover:text-gray-300" href={"/"}>
    //           <p className="font-pacifico text-4xl  flex items-center justify-center">
    //             ✔️
    //           </p>
    //         </Link>
    //       {status === "authenticated" ? (
    //         <div className="flex flex-col justify-center items-end">
    //           <button onClick={() => setIsAccountOpen(!isAccountOpen)}>
    //           {data.user?.image ? (
    //             <Image
    //               className="w-11 h-11 rounded-full hover:opacity-50"
    //               src={data.user.image}
    //               width={50}
    //               height={50}
    //               alt="profile-pic"
    //             />
    //           ) : (
    //             <div className="w-11 h-11 rounded-full bg-gray-300"> </div>
    //           )}
    //           </button>
    //           {isAccountOpen ? (
    //             <div className="fixed top-20  text-sm rounded-md p-4 z-10 shadow-[0_4px_10px_rgb(0,0,0,0.12)] ">
    //               <div>{data.user?.name}</div>
    //               <div>{data.user?.email}</div>
    //               <button onClick={logouthandler}>Log Out</button>
    //             </div>
    //           ) : null}
    //         </div>
    //       ) : (
    //         <Link
    //           className="bg-black text-white hover:bg-gray-700 rounded-md p-3"
    //           href={"/api/auth/signin"}
    //         >
    //           Login
    //         </Link>
    //       )}
    //     </div>
    //     {isOpen ? (
    //       <div className="text-gray-900 sticky z-10 flex flex-col items-center gap-3 m-4">
        
    //         <Link className=" hover:text-gray-300" href={"/booknow"}>
    //            Bookings
    //         </Link>
    //       </div>
    //     ) : null}
    //   </nav>
    // </>

    <div>nav</div>
  );
};

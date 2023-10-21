"use client";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  return (
    <div
      className="
    border-[1px]
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
   "
    >
      <div
        className=" 
    flex
    flex-row
    justify-between
    items-center"
      >
        <div
          className="
        font-semibold
        px-6
        text-sm"
        >
          Anywhere
        </div>
        <div
          className="hidden
sm:block
text-sm
font-semibold
px-6
border-x-[1px]
flex-1
text-center
"
        >
          Anytime
        </div>
        <div
          className="pl-6
          pr-4
          text-sm
          text-gray-600
          flex
          flex-row
          items-center
          gap-3
          "
        >
          Add Guest
          <div className="bg-red-500 p-2 rounded-full text-white">
            <AiOutlineSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

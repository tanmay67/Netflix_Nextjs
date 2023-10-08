"use client";
import { auth } from "@utils/firebase";
import { signOut } from "firebase/auth";
import React, { memo, useState } from "react";

const Dropdown = ({ photo, name }) => {
  //   const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const onFocus = () => {
    setShowDropdown(true);
  };

  const onBlur = () => {
    setShowDropdown(false);
  };

  const onSignOut = () => {
    try {
      signOut(auth);
    } catch (error) {
      //   navigate("/error");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={onFocus} onFocus={onFocus} onBlur={onBlur}>
        <img
          className="w-12 h-12 scale-75 sm:scale-100 rounded-lg object-cover"
          alt="usericon"
          src={photo}
        />
        <div className="relative w-full">
          {showDropdown && (
            <div className="absolute right-[0rem] top-[0.5rem] p-2 opacity-70 font-sm text-white bg-black rounded-sm">
              <ul className="w-full h-full whitespace-nowrap">
                <li className="cursor-default p-2 px-4 border border-white border-b-1 border-l-0 border-r-0 border-t-0">
                  {name}
                </li>
                <li className="p-2 cursor-pointer" onClick={onSignOut}>
                  SIGN OUT
                </li>
              </ul>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default memo(Dropdown);

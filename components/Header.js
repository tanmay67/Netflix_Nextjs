import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NETFLIX_LOGO } from "@utils/constants";
import { BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import Dropdown from "./Dropdown";
import { toggleSearchView } from "@utils/redux/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => {
    return state.userSlice;
  });
  const showSearch = useSelector((state) => {
    return state.searchSlice.showSearch;
  });

  const handleSearchClick = () => {
    // toggle search component
    dispatch(toggleSearchView());
  };

  return (
    <div className="absolute w-full top-0 left-0 z-10 py-2 px-2 bg-gradient-to-b from-black flex justify-between">
      <span className="flex w-[5rem] sm:w-[8rem]">
        <img
          style={{ width: "inherit", height: "inherit" }}
          className="object-contain"
          src={NETFLIX_LOGO}
          alt="logo"
        />
      </span>

      {userInfo && (
        <div className="flex flex-1 px-4 justify-end items-center gap-3">
          {}
          <button onClick={handleSearchClick}>
            {showSearch ? (
              <GoHomeFill className="text-white w-[1.5rem] h-[1.5rem]" />
            ) : (
              <BiSearch className="text-white w-[1.5rem] h-[1.5rem]" />
            )}
          </button>
          <Dropdown photo={userInfo.photoURL} name={userInfo.displayName} />
        </div>
      )}
    </div>
  );
};

export default Header;

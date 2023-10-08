"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearSearchResults, searchApiCall } from "@utils/redux/searchSlice";
import Searchbar from "./Searchbar";
import MovieSuggestions from "./MovieSuggestions";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const pageNumberRef = useRef(1);
  const searchTextTest = useRef(null);

  const onScroll = () => {
    let scrollerElement = document.getElementById("scroller");
    let scrollTop = scrollerElement.scrollTop;
    let offsetHeight = scrollerElement.offsetHeight;
    let scrollHeight = scrollerElement.scrollHeight;
    if (scrollTop + offsetHeight + 1 >= scrollHeight) {
      console.log("hey");
      pageNumberRef.current = pageNumberRef.current + 1;
      dispatch(
        searchApiCall({
          name: searchTextTest.current.value,
          page: pageNumberRef.current,
          firstRender: false,
        })
      );
    }
  };

  useEffect(() => {
    let scrollerElement = document.getElementById("scroller");
    scrollerElement.addEventListener("scroll", onScroll);
    return () => {
      scrollerElement.removeEventListener("scroll", onScroll);
      dispatch(clearSearchResults());
    };
  }, []);

  return (
    <div
      id="scroller"
      className="text-white px-4 h-screen w-screen overflow-auto bg-black"
    >
      <Searchbar ref={{ searchTextTest, pageNumberRef }} />
      <MovieSuggestions />
    </div>
  );
};

export default SearchComponent;

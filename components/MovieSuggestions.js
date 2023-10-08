"use client";
import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { useRouter } from "next/navigation";

const MovieSuggestions = () => {
  const router = useRouter();

  const { searchLoading, searchResults } = useSelector((state) => {
    return state.searchSlice;
  });

  const onSelectMovie = (e) => {
    console.log(e.target);
    console.log(e.target.tagName);
    let tagName = e.target.tagName;
    if (tagName === "IMG") {
      let movieId = e.target.id;
      console.log(e.target.id);
      router.push(`/browse/${movieId}`);
    }
  };

  return (
    <ul
      onClick={onSelectMovie}
      className="list-none mt-8 px-5 sm:px-10 pb-10 flex justify-center sm:justify-between flex-wrap gap-[1rem]"
    >
      {searchResults.length === 0 ? (
        <li></li>
      ) : (
        <>
          {searchResults.map((result) => (
            <MovieCard key={result.id} movie={result} />
          ))}
          {searchLoading &&
            Array(5)
              .fill("")
              .map((elm, i) => (
                <div
                  key={i}
                  className="animate-pulse flex items-center justify-center  bg-gray-800 rounded box-border w-[8rem] sm:w-[10rem] h-[15rem] dark:bg-gray-700"
                ></div>
              ))}
        </>
      )}
    </ul>
  );
};

export default MovieSuggestions;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const router = useRouter();

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
    <div className="px-6 relative [&:not(:first-child)]:top-[-4rem]">
      <div className="flex flex-col overflow-x-auto overflow-y-hidden no-scrollbar pb-16">
        <h1 className="text-3xl py-2">{title}</h1>
        <ul onClick={onSelectMovie} className="list-none flex gap-5 relative">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;

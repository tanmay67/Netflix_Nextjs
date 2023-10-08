"use client";
import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((state) => {
    return state.moviesSlice;
  });
  if (Object.values(movies).every((elm) => elm !== null) === false) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text-white relative  sm:top-[-1rem] md:top-[-12rem]">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />

      <MovieList title={"Popular"} movies={movies.popularMovies} />

      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;

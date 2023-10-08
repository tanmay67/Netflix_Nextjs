"use client";
import React from "react";
import useNowPlayingMovies from "@hooks/useNowPlayingMovies";
import MainContainer from "@components/MainContainer";
import SecondaryContainer from "@components/SecondaryContainer";
import usePopularMovies from "@hooks/usePopularMovies";
import useTopRatedMovies from "@hooks/useTopRatedMovies";
import useUpcomingMovies from "@hooks/useUpcomingMovies";
import SearchComponent from "@components/SearchComponent";
import { useSelector } from "react-redux";
import { IMDB_API } from "@utils/constants";

const Browse = () => {
  const showSearch = useSelector((state) => {
    return state.searchSlice.showSearch;
  });

  useNowPlayingMovies(
    `${IMDB_API}/3/movie/now_playing?page=1`,
    "nowPlayingMovies"
  );
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <section className="w-screen h-screen overflow-auto">
      {showSearch ? (
        <SearchComponent />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </section>
  );
};

export default Browse;

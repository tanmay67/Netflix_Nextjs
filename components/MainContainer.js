"use client";
import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "@components/VideoTitle";
import VideoBackground from "@components/VideoBackground";

const MainContainer = () => {
  const movies = useSelector((state) => {
    return state.moviesSlice?.nowPlayingMovies;
  });
  if (!movies) return;
  const { original_title, overview, id } = movies[0];

  return (
    <div className="w-full relative">
      <VideoTitle id={id} title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;

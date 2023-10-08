"use client";
import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "@hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((state) => {
    return state.moviesSlice.trailerVideo;
  });

  useMovieTrailer(movieId);

  if (!trailerVideo)
    return <div className="w-full aspect-video">Video not available</div>;
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?&autoplay=1&mute=1&playlist=${trailerVideo.key}&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

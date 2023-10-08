"use client";
import React from "react";
import { IMG_CDN_URL } from "@utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <li className="w-[8rem] sm:w-[10rem] h-[15rem] cursor-pointer relative z-0 transition-all duration-500 hover:scale-150 hover:z-[1000000]">
      <img
        id={movie.id}
        className="w-[8rem] sm:w-[10rem] h-full max-w-none object-cover"
        src={`${IMG_CDN_URL}${movie.poster_path}`}
        alt={movie.original_title}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = currentTarget.src =
            "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
        }}
      />
    </li>
  );
};

export default MovieCard;

"use client";
import { useRouter } from "next/navigation";
import React from "react";

const VideoTitle = ({ id, title, overview }) => {
  const router = useRouter();

  const playVideo = () => {
    router.push(`/browse/${id}`);
  };

  return (
    <div className="absolute w-full aspect-video text-white bg-gradient-to-r from-black flex flex-col justify-center px-12">
      <h1 className="text-2xl py-2 font-bold">{title}</h1>
      <div>
        <p className="hidden xl:block py-6 text-lg w-2/4">{overview}</p>
        <div className="flex w-fit">
          <button
            onClick={playVideo}
            className="bg-white text-black px-8 py-2  opacity-80 rounded-lg flex-1 whitespace-nowrap hover:opacity-60"
          >
            Play
          </button>
          <button
            onClick={playVideo}
            className="mx-2 bg-gray-500 text-white px-8 py-2  opacity-50 rounded-lg flex-1 whitespace-nowrap"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;

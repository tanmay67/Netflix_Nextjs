"use client";
import React, { memo, useEffect, useState } from "react";
import { API_OPTIONS, IMDB_API } from "@utils/constants";
import { FaStar } from "react-icons/fa";
import { useParams } from "next/navigation";

const DisplayMovie = () => {
  const params = useParams();

  const [videoId, setVideoId] = useState(null);
  const [videoInfo, setVideoInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const videoPathApi = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${IMDB_API}/3/movie/${params.id}/videos`,
        API_OPTIONS
      );
      if (response.status !== 200) throw new Error("Something went wrong");
      const data = await response.json();
      resolve({ type: "video", ...data });
    } catch (error) {
      reject(error);
    }
  });

  const videoInfoApi = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${IMDB_API}/3/movie/${params.id}`,
        API_OPTIONS
      );
      if (response.status !== 200) throw new Error("Something went wrong");
      const data = await response.json();
      resolve({ type: "info", ...data });
    } catch (error) {
      reject(error);
    }
  });

  const handleApiRequests = async () => {
    try {
      setLoading(true);
      const response = await Promise.allSettled([videoPathApi, videoInfoApi]);
      for (let i = 0; i <= 1; i++) {
        let data = response[i];
        if (data.status === "fulfilled") {
          if (data.value.type === "info") {
            setVideoInfo(data.value);
          } else if (
            data.value.type === "video" &&
            data.value.results.length !== 0
          ) {
            const { key } = data.value.results.find(
              (elm) => elm.site === "YouTube"
            );
            setVideoId(key);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // api for finding video, all info of movie api
    // api for finding video
    // api for info of movie
    handleApiRequests();
  }, []);

  if (loading) {
    return (
      <div className="text-white h-screen w-screen overflow-auto bg-black">
        <div
          role="status"
          className="h-full p-4 shadow animate-pulse md:p-6 dark:border-gray-800"
        >
          <div className="flex items-center justify-center h-3/4 mb-4 bg-gray-800 rounded dark:bg-gray-700"></div>
          <div className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-800 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-800 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-800 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-center mt-4 space-x-3">
            <div>
              <div className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-800 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="text-white h-screen w-screen overflow-auto bg-black">
      <div className="h-3/4">
        <iframe
          className="w-full h-full aspect-video"
          src={`https://www.youtube.com/embed/${videoId}?frameborder="0"&controls=1&modestbranding=0&autoplay=1&mute=1&playlist=${videoId}&loop=1`}
          title="YouTube video player"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="p-2 px-4">
        <div className="block md:flex justify-between items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl">{videoInfo.title}</h1>
            <h3 className="text-lg">{videoInfo.release_date}</h3>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex gap-4 my-4">
              {[...Array(5)].map((elm, i) => {
                const currentRating = i + 1;
                return (
                  <label key={i}>
                    <FaStar
                      className="scale-150"
                      color={
                        currentRating <= Math.round(videoInfo.vote_average / 2)
                          ? "#ffc107"
                          : "#e4e5e9"
                      }
                    />
                  </label>
                );
              })}
            </div>
            <div className="flex gap-2">
              {videoInfo.genres.map((genre) => (
                <span key={genre.id} className="italic">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-lg italic mt-4 underline">{videoInfo.tagline}</p>
        <p className="text-md mt-1">{videoInfo.overview}</p>
        <div className="flex-wrap whitespace-nowrap italic flex justify-end gap-4 py-4">
          {videoInfo.production_companies.map((production) => (
            <span key={production.id}>{production.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(DisplayMovie);

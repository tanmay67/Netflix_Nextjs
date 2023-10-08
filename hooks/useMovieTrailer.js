import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, IMDB_API } from "../utils/constants";
import { addTrailerVideo } from "../utils/redux/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const movieData = async () => {
    const response = await fetch(
      `${IMDB_API}/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(
      addTrailerVideo(data.results.find((elm) => elm.type === "Trailer"))
    );
  };

  useEffect(() => {
    movieData();
  }, []);

  return;
};

export default useMovieTrailer;

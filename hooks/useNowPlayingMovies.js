import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/redux/moviesSlice";

const useNowPlayingMovies = (api, responsePath) => {
  const dispatch = useDispatch();

  let apiResponseDistribution = {
    nowPlayingMovies: (data) => {
      dispatch(addNowPlayingMovies(data.results));
    },
  };

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(api, API_OPTIONS);
      if (response.status !== 200) throw new Error("Something went wrong");
      const data = await response.json();
      apiResponseDistribution[responsePath](data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return true;
};

export default useNowPlayingMovies;

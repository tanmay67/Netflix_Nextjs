import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, IMDB_API } from "../utils/constants";
import { addUpcomingMovies } from "../utils/redux/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `${IMDB_API}/3/movie/upcoming?page=1`,
        API_OPTIONS
      );
      if (response.status !== 200) throw new Error("Something went wrong");
      const data = await response.json();
      dispatch(addUpcomingMovies(data.results));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return true;
};

export default useUpcomingMovies;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, IMDB_API } from "../utils/constants";
import { addPopularMovies } from "../utils/redux/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `${IMDB_API}/3/movie/popular?page=1`,
        API_OPTIONS
      );
      if (response.status !== 200) throw new Error("Something went wrong");
      const data = await response.json();
      dispatch(addPopularMovies(data.results));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return true;
};

export default usePopularMovies;

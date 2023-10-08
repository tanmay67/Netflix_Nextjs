import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice,
    moviesSlice: moviesSlice,
    searchSlice: searchSlice,
  },
});

export default store;

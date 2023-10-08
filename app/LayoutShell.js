"use client";
import Header from "@components/Header";
import store from "@utils/redux/store";
import React from "react";
import { Provider } from "react-redux";
import OutletComp from "./OutletComp";

const LayoutShell = ({ children }) => {
  return (
    <Provider store={store}>
      <main className="app">
        <Header />
        <OutletComp children={children} />
      </main>
    </Provider>
  );
};

export default LayoutShell;

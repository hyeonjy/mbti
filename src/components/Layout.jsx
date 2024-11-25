import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="h-full bg-gray-100 flex flex-col justify-between">
      <Header />
      <main className="container mx-auto pt-10 main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

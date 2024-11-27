import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-gray-100 flex flex-col justify-content items-center">
      <Header />
      <main className="min-h-screen container mx-auto pt-10 main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

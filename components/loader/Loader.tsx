'use client";'
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <InfinitySpin width="200" color="#066dca" />
    </div>
  );
};

export default Loader;

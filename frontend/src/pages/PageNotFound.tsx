import React from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-white text-5xl font-bold uppercase tracking-extra-wide text-center px-6">
        Page Not Found
      </h1>
      <button
        className="bg-zinc-900 border-pink text-pink font-light uppercase border-2 px-6 py-3 hover:text-white hover:bg-pink"
        onClick={() => navigate("/")}
      >
        Go to homepage
      </button>
    </div>
  );
};

import React from "react";
import Sidebar from "../UI/Sidebar/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-[100vh]">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}

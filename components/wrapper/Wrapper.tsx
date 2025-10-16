"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/store";
import Login from "../login/Login";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token && router) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen h-screen overflow-y-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default AuthWrapper;


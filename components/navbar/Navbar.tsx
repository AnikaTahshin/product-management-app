"use client";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { HiBars3BottomRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { clearToken, store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = ({ setIsOpen }: any) => {
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  //   const handleLogout = () => {
  //   dispatch(clearToken());
  // };

  const handleLogout = () => {
  localStorage.removeItem("token"); 
  store.dispatch(clearToken());
  router.push("/");
};

  return (
    <>
      <div className="bg-white h-[90px] shadow-lg flex justify-between items-center gap-3 px-[2%]">
        {/* search input starts*/}
        {/* <div className="search-box border border-[#dfe0e4] relative h-[45px] hidden lg:flex items-center rounded-full w-70 outline-none">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full ps-4 outline-none"
          />
          <div className="absolute bg-[#006dca] right-0.5 p-3 rounded-[50%]">
            <MdSearch color="white" />
          </div>
        </div> */}
        {/* search input ends*/}

        <div
          className="toggle lg:hidden flex cursor-pointer text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <HiBars3BottomRight />
        </div>
        
           <button
                  onClick={handleLogout}
                  className="text-md hover:text-[#438953] cursor-pointer transition-colors duration-300 flex items-center gap-2"
                >
                  <MdLogout />
                  Logout
                </button>

        
      </div>
    </>
  );
};

export default Navbar;

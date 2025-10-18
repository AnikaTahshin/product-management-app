"use client";
import Link from "next/link";
import React from "react";
import { FiHome, FiUsers } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <FiHome /> },
    {
      href: "/products",
      label: "Products",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    { href: "/categories", label: "Categories", icon: <BiCategory /> },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={` w-[320px] min-h-[100vh] pb-0 p-5 sidebar ${
        isOpen ? "bg-[#5A9367]" : "bg-[#5A9367]"
      } shadow-xl fixed lg:relative transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="nav-logo flex items-center justify-center py-6 mb-8">
        <Link href="/" className="cursor-pointer flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#7FBF80] to-[#5A9367] shadow-lg">
            <span className="text-white font-extrabold text-xl">PM</span>
          </div>

          <h1 className="text-2xl font-extrabold font-unbounded text-white tracking-wide drop-shadow-md">
            Prodify
          </h1>
        </Link>
      </div>

      {/* <span
        className={`h-[15px] ${isOpen ? "bg-[#dfe0e4]" : ""} w-full block my-2`}
      ></span> */}

      <ul className="flex flex-col gap-3 sidebar-nav relative z-20 ">
        {links.map(({ href, label, icon }) => {
          const active = isLinkActive(href);

          return (
            <li
              key={href}
              className={`py-4 px-4 rounded-xl transition-colors duration-300 font-sora ${
                active
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              <Link
                href={href}
                className="text-md transition-colors duration-300 flex flex-row items-center gap-3 group"
              >
                <span
                  className={`${
                    active ? "text-black" : "text-white group-hover:text-black"
                  }`}
                >
                  {icon}
                </span>
                <p
                  className={`${
                    active ? "text-black" : "text-white group-hover:text-black"
                  }`}
                >
                  {label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

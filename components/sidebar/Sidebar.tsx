"use client";
import Link from "next/link";
import React from "react";
import { FiHome, FiUsers } from "react-icons/fi";
import { MdOutlineSignpost } from "react-icons/md";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const pathname = usePathname();


  const links = [
    { href: "/", label: "Dashboard", icon: <FiHome /> },
    { href: "/products", label: "Products", icon: <MdOutlineSignpost /> },
    { href: "/categories", label: "Categories", icon: <FiUsers /> },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"; 
    }
    return pathname.startsWith(href); 
  };

  return (
    <div
      className={`h-100vh w-[320px] min-h-[100vh] pb-0 p-5 sidebar ${isOpen ? "bg-[#bfbfbf]" : "bg-[#bfbfbf]"} shadow-xl fixed lg:relative transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="nav-logo text-center py-2">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-3xl font-semibold font-unbounded">
           <span className="text-[#066dca] font-unbounded">Product</span> Management
          </h1>
        </Link>
      </div>

      <span className={`h-[15px] ${isOpen ? "bg-[#dfe0e4]" : ""} w-full block my-2`}></span>

      <ul className="flex flex-col gap-3 sidebar-nav relative z-20 ">
        {links.map(({ href, label, icon }) => {
          const active = isLinkActive(href);

          return (
            <li
              key={href}
              className={`py-4 px-4 rounded-xl transition-colors duration-300 font-sora ${
                active
                  ? "bg-[var(--prim-color)] text-white"
                  : "hover:bg-[var(--prim-color)]"
              }`}
            >
              <Link
                href={href}
                className="text-md transition-colors duration-300 flex flex-row items-center gap-3 group"
              >
                <span
                  className={`${
                    active ? "text-white" : "text-[#066dca] group-hover:text-white"
                  }`}
                >
                  {icon}
                </span>
                <p
                  className={`${
                    active ? "text-white" : "text-neutral-500 group-hover:text-white"
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

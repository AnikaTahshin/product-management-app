"use client"
import { loginApi } from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginApi(email);

    if (res) {
    toast.success("Login successfully!", { transition: Bounce });
      
    }
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) router.replace("/"); 
}, []);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#438953] sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex cursor-pointer w-full justify-center rounded-md bg-[#5A9367] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#438953] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#438953]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

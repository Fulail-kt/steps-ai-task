"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const navigate = useRouter();
  const token=localStorage.getItem('ai_token')
  const handleLogout = () => {
    localStorage.removeItem("ai_token");
    navigate.replace("/");
  };
  return (
    <div className="h-20 md:min-h-screen bg-gray-800 text-white p-6 w-full md:w-60">
      <div className="flex items-center gap-3 md:mb-4 justify-center">
        <h2 className="text-xl hidden md:block font-bold">Doc-Dashboard</h2>
        <div className="md:hidden flex">
          <Link
            href="/dashboard"
            className="block p-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>

          <Link
            href="/patients"
            className="block p-2 rounded hover:bg-gray-700"
          >
            Patients
          </Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="block w-full text-start p-2 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/doc/sign-in">
              <button
                onClick={handleLogout}
                className="block w-full text-start p-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </Link>
          )}
        </div>
      </div>
      <ul className="space-y-4 hidden md:block ">
        <li>
          <Link
            href="/dashboard"
            className="block p-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/patients"
            className="block p-2 rounded hover:bg-gray-700"
          >
            Patients
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-start p-2 rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

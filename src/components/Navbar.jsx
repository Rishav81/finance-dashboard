import React, { useEffect, useState, useRef } from "react";
import {
  Moon,
  Sun,
  User,
  Shield,
  LogOut,
  Check,
  LogOutIcon,
} from "lucide-react";

const Navbar = ({ role, setRole }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  // States for the custom dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 
      bg-white/80 dark:bg-slate-950/80 backdrop-blur-md
      border-b border-slate-200 dark:border-slate-800 transition-all duration-300"
    >
      {/* Left - Welcome */}
      <div className="flex flex-col">
        <div className="hidden md:block">
          <h1 className="  text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, Rishav 👋
          </h1>
          <p className=" text-sm text-slate-500 dark:text-slate-400 font-medium">
            Dashboard Overview
          </p>
        </div>
        <div>
          <h1 className=" md:hidden text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Fintech
          </h1>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800
          hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
        >
          {darkMode ? (
            <Sun
              size={18}
              className="text-amber-400 group-hover:rotate-45 transition-transform"
            />
          ) : (
            <Moon
              size={18}
              className="text-slate-600 group-hover:-rotate-12 transition-transform"
            />
          )}
        </button>

        {/* Profile Dropdown Container */}
        <div
          className="relative pl-3 border-l border-slate-200 dark:border-slate-800"
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 
              flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20
              group-hover:scale-105 transition-all border-2 border-white dark:border-slate-900"
            >
              R
            </div>
          </button>

          {/* Actual Dropdown Menu */}
          {isProfileOpen && (
            <div
              className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 
              rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden animate-in fade-in zoom-in duration-200"
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                {role === "admin" ? (
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Rishav Singh
                  </p>
                ) : (
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Rishav Kumar
                  </p>
                )}
                {role === "admin" ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    rishav.singh@example.com
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    rishav.kumar@example.com
                  </p>
                )}
              </div>

              {/* Role Selection Section */}
              <div className="p-2">
                <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Select Role
                </p>

                <button
                  onClick={() => {
                    setRole("viewer");
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                  ${role === "viewer" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                  <div className="flex items-center gap-2">
                    <User size={16} /> Viewer
                  </div>
                  {role === "viewer" && <Check size={14} />}
                </button>

                <button
                  onClick={() => {
                    setRole("admin");
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                  ${role === "admin" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                  <div className="flex items-center gap-2">
                    <Shield size={16} /> Admin
                  </div>
                  {role === "admin" && <Check size={14} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

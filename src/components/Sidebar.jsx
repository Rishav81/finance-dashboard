import React from "react";

import {
  Settings,
  LogOut,
  LayoutDashboard,
  ArrowRightLeft,
  Brain,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/transactions", label: "Transactions", icon: ArrowRightLeft },
    { to: "/insights", label: "Insights", icon: Brain },
  ];
  return (
    <div className="  fixed top-0 left-0 h-screen md:w-44 lg:w-64 flex-col  border-gray-200 bg-gradient-to-b from-slate-900 via-indigo-900 to-blue-900  hidden md:flex dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white  duration-300 transition">
      {/* Logo */}

      <a className="text-2xl font-bold text-white  px-6 py-5 " href="/">
        Fintech
      </a>

      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"></div>

        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      </div>

      {/* Navigation */}

      <nav className="mt-4 px-4 text-white/80">
        <ul className="space-y-2  font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 px-4 rounded-lg flex items-center gap-2 transition

    ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* 🔥 Active Indicator Line */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full"></span>
                  )}
                  <item.icon />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}

      <div className=" hidden md:block mt-auto  pb-4 text-gray-400">
        <div className="relative w-full h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"></div>

          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        </div>

        <div className="py-3 px-8  font-bold  hover:text-white/80 cursor-pointer flex duration-200 items-center gap-2">
          <Settings />
          Settings
        </div>

        <div className="relative w-full h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"></div>

          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        </div>

        <div className="pt-3 px-8   font-bold hover:text-white/80 duration-200 cursor-pointer flex items-center gap-2">
          <LogOut />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

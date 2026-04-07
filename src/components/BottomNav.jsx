import { ArrowRightLeft, Brain, LayoutDashboard, LogOut } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: LayoutDashboard },
    { to: "/transactions", icon: ArrowRightLeft },
    { to: "/insights", icon: Brain },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 w-full z-50 
      bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      border-t border-white/10 backdrop-blur-lg"
    >
      <nav className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "text-blue-400 scale-105"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} />

                <span
                  className={`h-1 w-1 rounded-full transition-all ${
                    isActive ? "bg-blue-400 w-4" : "bg-transparent"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;

import React from "react";
import { Bell } from "lucide-react";

export default function AnimatedBell({ count = 0, className = "", size = 20, animate = false, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Notifications"
      className={`relative inline-flex items-center justify-center rounded-full p-2 hover:bg-black/5 transition-colors ${className}`}
    >
      <Bell
        className={`text-gray-900 ${animate ? "animate-bell-wiggle" : ""}`}
        width={size}
        height={size}
      />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-green-500 text-white text-[10px] leading-[18px] text-center shadow" >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

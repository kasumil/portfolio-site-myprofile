import React from "react";

function NavigationBar({
  currentIndex,
  scrollRef,
  sectionCount,
  isDark,
  setIsDark,
}: {
  currentIndex: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  sectionCount: number;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-bold">MyLogo</div>

        {/* Navigation numbers */}
        <div className="flex gap-2">
          {Array.from({ length: sectionCount }).map((_, i) => (
            <button
              key={i}
              className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                currentIndex === i ? "bg-black text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => {
                if (!scrollRef.current) return;
                const sections = scrollRef.current.querySelectorAll(".snap-start");
                const target = sections[i] as HTMLElement;
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;

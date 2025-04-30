"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./components/Container";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDark, setIsDark] = useState(false);

  function handleScroll() {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop; // 현재 스크롤된 세로 위치(px)
      const scrollHeight = scrollRef.current.scrollHeight; // 위에서 얼마나 스크롤됐는지 나타냄
      const clientHeight = scrollRef.current.clientHeight; // 전체 높이
      const newIndex = Math.round(scrollTop / clientHeight); // 해당 위치 별 인덱스
      setCurrentIndex(newIndex);
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const clientHeight = scrollRef.current.clientHeight;
      const initialIndex = Math.round(scrollTop / clientHeight);
      setCurrentIndex(initialIndex);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [isDark]);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <NavigationBar
        currentIndex={currentIndex}
        scrollRef={scrollRef}
        sectionCount={4}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === i ? "bg-black scale-125" : "bg-gray-400"
            }`}
            onClick={() => {
              const container = document.querySelectorAll(".snap-start")[i];
              if (container instanceof HTMLElement) {
                container.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          />
        ))}
      </div>

      <Container className="snap-start h-screen" index={1} highlight={currentIndex === 0} />
      <Container className="snap-start h-screen" index={2} highlight={currentIndex === 1} />
      <Container className="snap-start h-screen" index={3} highlight={currentIndex === 2} />
      <Container className="snap-start h-screen" index={4} highlight={currentIndex === 3} />
    </div>
  );
}

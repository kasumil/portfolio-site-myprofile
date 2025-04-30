"use client";

import React from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  index: number;
  highlight?: boolean;
};

function Container(props: Props) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <div
      ref={ref}
      className={`w-full h-svh snap-start flex items-center justify-center transition-all duration-500 ${
        props.highlight ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-4xl font-bold">{props.index}</div>
      <div
        className={`mt-6 text-2xl font-extrabold transition-all duration-700 transform ${
          inView ? "opacity-100 scale-125 translate-y-0 shadow-2xl" : "opacity-0 scale-75 translate-y-4"
        }`}
      >
        현재 보고 있는 컨테이너입니다!
      </div>
    </div>
  );
}

export default Container;

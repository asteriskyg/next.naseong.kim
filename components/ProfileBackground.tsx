"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import type { UserType } from "type";

const BackgroundPattern = {
  backgroundColor: `#DFDBE5`,
  backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 100 100'><g fill-rule='evenodd'><g fill='%239C92AC' fill-opacity='0.4'><path opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/><path d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/></g></g></svg>")`,
};

export const ProfileBackground = ({ user }: { user?: UserType }) => {
  const [scrollDepth, setScrollDepth] = useState(0);

  const updateScrollDepth = () => {
    setScrollDepth(window.scrollY);
  };

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener("scroll", updateScrollDepth);
    };
    watchScroll();

    return () => {
      window.removeEventListener("scroll", updateScrollDepth);
    };
  }, []);

  const translateY = {
    transform: `translateY(${scrollDepth * 0.5}px)`,
  };

  if (!user?.profileBackgroundUrl)
    return (
      <div
        className="aspect-h-1 aspect-w-2 -mt-14 w-full bg-slate-100 sm:aspect-h-2 sm:aspect-w-5 md:aspect-h-2 md:aspect-w-7 lg:aspect-h-2 lg:aspect-w-9"
        style={translateY}
      >
        <div style={BackgroundPattern} />
      </div>
    );

  return (
    <div
      className="aspect-h-1 aspect-w-2 -mt-14 w-full bg-slate-100 sm:aspect-h-2 sm:aspect-w-5 md:aspect-h-2 md:aspect-w-7 lg:aspect-h-2 lg:aspect-w-9"
      style={translateY}
    >
      <Image
        src={`https://${process.env.NEXT_PUBLIC_R2_BUCKET_ID}.r2.dev/${user.profileBackgroundUrl}`}
        alt=""
        fill
        className="object-cover"
      />
    </div>
  );
};

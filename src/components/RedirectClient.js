"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const BASE_PATH = "/demo/webstepnext";

export function normalizeRedirectUrl(target) {
  if (!target) return `${BASE_PATH}/`;
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  const clean = target.startsWith("/") ? target : `/${target}`;
  if (clean.startsWith(BASE_PATH)) {
    return clean;
  }
  return `${BASE_PATH}${clean}`;
}

export default function RedirectClient({ target }) {
  const fullTarget = normalizeRedirectUrl(target);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(fullTarget);
    }
  }, [fullTarget]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-roboto">
      <meta httpEquiv="refresh" content={`0;url=${fullTarget}`} />
      <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-700 font-medium mb-2">Redirecting you to the updated page...</p>
      <Link href={fullTarget} className="text-pink-600 font-bold hover:underline">
        Click here if you are not redirected automatically
      </Link>
    </div>
  );
}

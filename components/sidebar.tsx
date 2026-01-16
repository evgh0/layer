"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useLage } from "@/context/lagen-context";

export const Sidebar = () => {
  const { lage, setLage } = useLage();
  const [isOpen, setIsOpen] = useState(false);
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-default-100 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/50 md:hidden w-full h-full cursor-default"
          onClick={() => setIsOpen(false)}
          aria-label="Close Sidebar"
        />
      )}

      <aside className={`flex flex-col w-64 border-r border-divider h-screen bg-background transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-50 md:translate-x-0 md:sticky md:top-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center h-16 px-6 border-b border-divider shrink-0">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">MUSTER</p>
          </NextLink>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-default-500 mb-4 uppercase">Verschachtelungslage</h2>
          <ul className="flex flex-col gap-2">
            {levels.map((l) => (
              <li key={l}>
                <button
                  onClick={() => {
                    setLage(l);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    lage === l 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "text-default-600 hover:bg-default-100"
                  }`}
                >
                  Lage {l + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

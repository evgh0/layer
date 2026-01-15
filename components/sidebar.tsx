"use client";

import NextLink from "next/link";
import { useLage } from "@/context/lagen-context";

export const Sidebar = () => {
  const { lage, setLage } = useLage();
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-divider h-screen sticky top-0">
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
                onClick={() => setLage(l)}
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
  );
};

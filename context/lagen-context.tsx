"use client";
import React, { createContext, useContext, useState } from 'react';

const LagenContext = createContext<{
  lage: number;
  setLage: (l: number) => void;
}>({ lage: 1, setLage: () => {} });

export const LagenProvider = ({ children }: { children: React.ReactNode }) => {
  const [lage, setLage] = useState(1);
  return (
    <LagenContext.Provider value={{ lage, setLage }}>
      {children}
    </LagenContext.Provider>
  );
};

export const useLage = () => useContext(LagenContext);

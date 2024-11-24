"use client";

import React, { createContext, useContext, useState } from 'react';

type SettingsContextType = {
  charactersPerRow: number;
  setCharactersPerRow: (count: number) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [charactersPerRow, setCharactersPerRow] = useState(5);

  return (
    <SettingsContext.Provider value={{ charactersPerRow, setCharactersPerRow }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
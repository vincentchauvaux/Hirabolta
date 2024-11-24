"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Progress, saveProgress, loadProgress } from '@/lib/progress';
import { useAuth } from '@/contexts/auth-context';

type ProgressState = {
  hiragana: Progress | null;
  katakana: Progress | null;
};

type ProgressContextType = {
  progress: ProgressState;
  setProgress: (characterSet: 'hiragana' | 'katakana', progress: Progress) => void;
  loading: boolean;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgressState] = useState<ProgressState>({ hiragana: null, katakana: null });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleSetProgress = async (characterSet: 'hiragana' | 'katakana', newProgress: Progress) => {
    setProgressState(prev => ({
      ...prev,
      [characterSet]: newProgress
    }));
    
    if (user) {
      await saveProgress(user.uid, characterSet, newProgress);
    }
  };

  useEffect(() => {
    const initializeProgress = async () => {
      setLoading(true);
      if (user) {
        const [hiraganaProgress, katakanaProgress] = await Promise.all([
          loadProgress(user.uid, 'hiragana'),
          loadProgress(user.uid, 'katakana')
        ]);

        setProgressState({
          hiragana: hiraganaProgress || { currentRow: "a", correctCount: 0, characterSet: 'hiragana' },
          katakana: katakanaProgress || { currentRow: "a", correctCount: 0, characterSet: 'katakana' }
        });
      } else {
        // Default progress for non-authenticated users
        setProgressState({
          hiragana: { currentRow: "a", correctCount: 0, characterSet: 'hiragana' },
          katakana: { currentRow: "a", correctCount: 0, characterSet: 'katakana' }
        });
      }
      setLoading(false);
    };

    initializeProgress();
  }, [user]);

  return (
    <ProgressContext.Provider value={{ 
      progress, 
      setProgress: handleSetProgress, 
      loading 
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
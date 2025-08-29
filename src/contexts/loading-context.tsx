"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LoadingType = 'search' | 'product' | 'default';

interface LoadingContextType {
  isLoading: boolean;
  loadingType: LoadingType;
  setLoading: (loading: boolean, type?: LoadingType) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<LoadingType>('default');

  const setLoading = (loading: boolean, type: LoadingType = 'default') => {
    setIsLoading(loading);
    setLoadingType(type);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingType, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

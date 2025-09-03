'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FilterModalContext = createContext<FilterModalContextType | undefined>(undefined);

export function FilterModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <FilterModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </FilterModalContext.Provider>
  );
}

export function useFilterModal() {
  const context = useContext(FilterModalContext);
  if (context === undefined) {
    throw new Error('useFilterModal deve ser usado dentro de um FilterModalProvider');
  }
  return context;
}

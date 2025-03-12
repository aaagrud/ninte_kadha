"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface DataContextType {
  data: any;
  setData: (data: any) => void;
}

// Create context with default values
const DataContext = createContext<DataContextType | null>(null);

// Create provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
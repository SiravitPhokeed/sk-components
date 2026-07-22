import { createContext, useContext } from "react";

export const SelectContext = createContext<{
  value: string | null;
  onChange: (value: string) => void;
} | null>(null);

export const useSelectContext = () => useContext(SelectContext);

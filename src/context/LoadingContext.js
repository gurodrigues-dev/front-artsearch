import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, loadingModal, setLoadingModal }}>
      { children }
    </LoadingContext.Provider>
  );
};
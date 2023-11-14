import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState(null);

  return (
    <ModalContext.Provider value={{ modalInfo, setModalInfo }}>
      { children }
    </ModalContext.Provider>
  );
};
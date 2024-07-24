import { createGenerateId, SheetsRegistry, JssProvider } from "react-jss";
import { createContext, useContext } from "react";

const SheetsContext = createContext(null);

export const SheetsRegistryProvider = ({ children }) => {
  const sheetsRegistry = new SheetsRegistry();

  return (
    <SheetsContext.Provider value={sheetsRegistry}>
      <JssProvider registry={sheetsRegistry} generateId={createGenerateId()}>
        {children}
      </JssProvider>
    </SheetsContext.Provider>
  );
};

export const useSheetsRegistry = () => useContext(SheetsContext);

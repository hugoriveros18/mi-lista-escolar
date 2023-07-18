import React, { createContext, useState } from 'react';

interface ContextValue {
  orderBy: OrderByFieldInput
  activeTab: string
  setOrderBy: React.Dispatch<React.SetStateAction<OrderByFieldInput>>
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

interface ProveedorDelContextoProps {
  children: React.ReactNode;
}

export const Context = createContext<ContextValue>({} as ContextValue);

export default function ListaEscolarContext({children}:ProveedorDelContextoProps) {

  //STATES
  const [orderBy, setOrderBy] = useState<OrderByFieldInput>('Relevancia');
  const [activeTab, setActiveTab] = useState<string>('');

  //JSX
  return(
    <Context.Provider
      value={{
        orderBy: orderBy,
        activeTab: activeTab,
        setOrderBy: setOrderBy,
        setActiveTab: setActiveTab
      }}
    >
      {children}
    </Context.Provider>
  )
}




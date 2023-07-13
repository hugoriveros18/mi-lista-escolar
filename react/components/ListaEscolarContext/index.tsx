import React, { createContext, useState } from 'react';

interface ContextValue {
  orderBy: OrderByFieldInput
  setOrderBy: React.Dispatch<React.SetStateAction<OrderByFieldInput>>
}

interface ProveedorDelContextoProps {
  children: React.ReactNode;
}

export const Context = createContext<ContextValue>({} as ContextValue);

export default function ListaEscolarContext({children}:ProveedorDelContextoProps) {

  //STATES
  const [orderBy, setOrderBy] = useState<OrderByFieldInput>('Relevancia');

  //JSX
  return(
    <Context.Provider
      value={{
        orderBy: orderBy,
        setOrderBy: setOrderBy
      }}
    >
      {children}
    </Context.Provider>
  )
}




import React, { createContext, useState, ReactNode } from 'react';

interface Cliente {
  nome: string;
  telefone: string;
}

interface ClienteContextData {
  cliente: Cliente;
  setCliente: (dados: Cliente) => void;
}

export const ClienteContext = createContext<ClienteContextData>({
  cliente: { nome: '', telefone: '' },
  setCliente: () => {},
});

export const ClienteProvider = ({ children }: { children: ReactNode }) => {
  const [cliente, setCliente] = useState<Cliente>({ nome: '', telefone: '' });

  return (
    <ClienteContext.Provider value={{ cliente, setCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};

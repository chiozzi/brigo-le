// app/context/CarrinhoContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Produto, ItemCarrinho, CarrinhoContextType } from '../types';

export const CarrinhoContext = createContext<CarrinhoContextType>({} as CarrinhoContextType);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  function adicionarAoCarrinho(produto: Produto) {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.id === produto.id);
      if (itemExistente) {
        // se já existe, aumenta a quantidade
        return prev.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        // senão adiciona novo item com quantidade 1
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  }

  function removerDoCarrinho(id: number) {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  }

  function aumentarQuantidade(id: number) {
    setCarrinho(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  }

  function diminuirQuantidade(id: number) {
    setCarrinho(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter(item => item.quantidade > 0) // remove item se quantidade for zero
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  // calcula o total do carrinho somando preço * quantidade
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

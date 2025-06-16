// app/types.ts
import { ImageSourcePropType } from 'react-native';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: ImageSourcePropType;  // para imagens com require() ou { uri: string }
}

// Item do carrinho com quantidade
export interface ItemCarrinho extends Produto {
  quantidade: number;
}

// Tipo do contexto do carrinho para ajudar no typing do context
export interface CarrinhoContextType {
  carrinho: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (id: number) => void;
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;
  limparCarrinho: () => void;
  total: number;
}

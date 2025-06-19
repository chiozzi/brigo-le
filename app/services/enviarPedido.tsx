// services/enviarPedido.ts
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { ItemCarrinho } from '../types';

export interface Pedido {
  nomeCliente: string;
  telefone: string;
  itens: ItemCarrinho[];
  total: number;
}

export async function enviarPedido(pedido: Pedido) {
  await addDoc(collection(db, 'pedidos'), {
    cliente: pedido.nomeCliente,
    telefone: pedido.telefone,
    itens: pedido.itens.map(item => ({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
    })),
    total: pedido.total,
    status: 'Pendente',
    criadoEm: Timestamp.now(),
  });
}

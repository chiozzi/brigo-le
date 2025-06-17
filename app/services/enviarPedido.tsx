import { db } from './firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ItemCarrinho } from '../types';

export interface Pedido {
  nomeCliente: string;
  telefone?: string;
  itens: ItemCarrinho[];
  total: number;
}

export async function enviarPedido(pedido: Pedido): Promise<void> {
  try {
    await addDoc(collection(db, 'pedidos'), {
      ...pedido,
      criadoEm: Timestamp.now(),
      status: 'pendente',
    });
  } catch (error) {
    console.error('Erro ao enviar pedido:', error);
    throw error;
  }
}

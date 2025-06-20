import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Cliente {
  nome: string;
  telefone: string;
}

export async function salvarCliente(cliente: Cliente) {
  if (!cliente.telefone) return;

  const docRef = doc(db, 'clientes', cliente.telefone); // Usa o telefone como ID
  await setDoc(docRef, cliente, { merge: true });
}

// app/admin/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useFonts } from 'expo-font';

interface Pedido {
  id: string;
  nomeCliente: string;
  telefone?: string;
  itens: {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
  }[];
  total: number;
  status: string;
  criadoEm: { seconds: number; nanoseconds: number };
}

export default function Dashboard() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Lobster: require('../../assets/fonts/Lobster-Regular.ttf'),
    Comfortaa: require('../../assets/fonts/Comfortaa-Regular.ttf'),
  });

  useEffect(() => {
    async function buscarPedidos() {
      try {
        const q = query(collection(db, 'pedidos'), orderBy('criadoEm', 'desc'));
        const snapshot = await getDocs(q);
        const lista: Pedido[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Pedido[];
        setPedidos(lista);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    }
    buscarPedidos();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#ffb6c1', '#ffc1d5']} style={styles.header}>
        <Text style={styles.title}>Painel Administrativo</Text>
        <Text style={styles.subtitle}>Gerencie seus pedidos com facilidade</Text>
      </LinearGradient>

      <View style={styles.content}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/')}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Pedidos Recentes</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ff375b" />
        ) : pedidos.length === 0 ? (
          <Text style={styles.noOrdersText}>Nenhum pedido no momento.</Text>
        ) : (
          pedidos.map(pedido => (
            <View key={pedido.id} style={styles.card}>
              <Text style={styles.pedidoCliente}>Cliente: {pedido.nomeCliente}</Text>
              {pedido.telefone && (
                <Text style={styles.pedidoItem}>Telefone: {pedido.telefone}</Text>
              )}
              <Text style={styles.pedidoItem}>Itens:</Text>
              {pedido.itens.map((item, idx) => (
                <Text key={idx} style={styles.pedidoItem}>• {item.nome} x{item.quantidade}</Text>
              ))}
              <Text style={styles.pedidoStatus}>
                Status: <Text style={pedido.status === 'Entregue' ? styles.statusEntregue : styles.statusPendente}>{pedido.status}</Text>
              </Text>
              <Text style={styles.pedidoValor}>Total: R$ {pedido.total.toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#ffc1d5', flex: 1 },
  header: {
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#fff0f5',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Lobster',
    color: '#482b1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Comfortaa',
    color: '#7c3f27',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#ff375b',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#ff375b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontFamily: 'Comfortaa',
    fontWeight: '700',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#482b1a',
    marginBottom: 15,
    fontFamily: 'Comfortaa',
  },
  noOrdersText: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    color: '#482b1a',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#ff375b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  pedidoCliente: {
    fontFamily: 'Comfortaa',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#482b1a',
  },
  pedidoItem: {
    fontFamily: 'Comfortaa',
    fontSize: 15,
    color: '#7c3f27',
    marginVertical: 3,
  },
  pedidoStatus: {
    fontFamily: 'Comfortaa',
    fontSize: 15,
    marginVertical: 3,
  },
  statusEntregue: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusPendente: {
    color: 'orange',
    fontWeight: 'bold',
  },
  pedidoValor: {
    fontFamily: 'Comfortaa',
    fontSize: 15,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#ff375b',
  },
});
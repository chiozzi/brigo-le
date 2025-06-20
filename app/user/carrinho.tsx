import React, { useContext, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CarrinhoContext } from '../context/carrinhoContext';
import { ClienteContext } from '../context/clienteContext';
import { enviarPedido } from '../services/enviarPedido';
import { ItemCarrinho } from '../types';

export default function Carrinho() {
  const {
    carrinho,
    total,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    limparCarrinho,
  } = useContext(CarrinhoContext);

  const { cliente } = useContext(ClienteContext);

  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [modalConfirmarCliente, setModalConfirmarCliente] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState<ItemCarrinho | null>(null);

  const handleFinalizarPedido = async () => {
    try {
      await enviarPedido({
        nomeCliente: cliente.nome,
        telefone: cliente.telefone,
        itens: carrinho,
        total,
      });
      limparCarrinho();
      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  };

  const renderItem = ({ item }: { item: ItemCarrinho }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>
          R$ {item.preco.toFixed(2)} x {item.quantidade}
        </Text>
        <Text style={styles.subtotal}>
          Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
        </Text>
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity
          onPress={() => diminuirQuantidade(item.id)}
          style={styles.botao}
        >
          <Text style={styles.botaoTexto}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => aumentarQuantidade(item.id)}
          style={styles.botao}
        >
          <Text style={styles.botaoTexto}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setItemParaExcluir(item);
            setModalExcluirVisible(true);
          }}
          style={[styles.botao, styles.remover]}
        >
          <Text style={styles.botaoTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Carrinho</Text>

      {cliente.nome && cliente.telefone && (
        <View style={styles.clienteInfo}>
          <Text style={styles.clienteTexto}>👤 {cliente.nome}</Text>
          <Text style={styles.clienteTexto}>📞 {cliente.telefone}</Text>
        </View>
      )}

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Seu carrinho está vazio 😢</Text>
        }
      />

      {carrinho.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.botaoFinalizar}
            onPress={() => setModalConfirmarCliente(true)}
          >
            <Text style={styles.finalizarTexto}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal: Confirmação dos dados do cliente */}
      <Modal transparent visible={modalConfirmarCliente} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar seus dados</Text>
            <View style={styles.modalMensagem}>
              <Text style={styles.modalLinha}>👤 Nome: {cliente.nome}</Text>
              <Text style={styles.modalLinha}>📞 Telefone: {cliente.telefone}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => {
                  setModalConfirmarCliente(false);
                  router.push('/user/perfil'); // 👈 ajuste aqui se sua tela tiver outro nome
                }}
              >
                <Text style={[styles.textobotao, { color: '#333' }]}>Editar</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={async () => {
                  setModalConfirmarCliente(false);
                  await handleFinalizarPedido();
                }}
              >
                <Text style={styles.textobotao}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Pedido enviado */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pedido enviado!</Text>
            <Text style={styles.modalMensagem}>
              Seu pedido foi enviado com sucesso. Em breve entraremos em contato.
            </Text>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                setModalVisible(false);
                router.replace('/user/cardapio'); // 👈 ajuste aqui se sua tela tiver outro nome
              }}
            >
              <Text style={styles.textobotao}>Voltar para o cardápio</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal: Confirmação para excluir item */}
      <Modal transparent visible={modalExcluirVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remover item</Text>
            <Text style={styles.modalMensagem}>
              Tem certeza que deseja remover "{itemParaExcluir?.nome}" do carrinho?
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setModalExcluirVisible(false)}
              >
                <Text style={[styles.textobotao, { color: '#333' }]}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  if (itemParaExcluir) {
                    removerDoCarrinho(itemParaExcluir.id);
                  }
                  setModalExcluirVisible(false);
                }}
              >
                <Text style={styles.textobotao}>Remover</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  clienteInfo: { marginBottom: 20 },
  clienteTexto: { fontSize: 16, color: '#333' },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fdfdfd',
  },
  itemInfo: { marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  preco: { fontSize: 14, color: '#555' },
  subtotal: { fontSize: 14, color: '#000' },
  botoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botao: {
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  botaoTexto: { fontSize: 16, fontWeight: 'bold' },
  remover: { backgroundColor: '#ff4d4d' },
  totalContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff375b',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    alignItems: 'center',
  },
  totalTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  botaoFinalizar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  finalizarTexto: { color: '#ff375b', fontWeight: 'bold', fontSize: 16 },
  vazio: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMensagem: {
    marginBottom: 20,
  },
  modalLinha: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    color: '#444',
  },

  modalBtn: {
    backgroundColor: '#ff375b',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  textobotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

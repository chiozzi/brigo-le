import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { CarrinhoContext } from '../context/carrinhoContext';
import { useLocalSearchParams } from 'expo-router';
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

  const { nome, telefone } = useLocalSearchParams();

  const [modalFinalizarVisible, setModalFinalizarVisible] = useState(false);
  const [itemParaRemover, setItemParaRemover] = useState<ItemCarrinho | null>(null);

  const confirmarFinalizacao = () => {
    setModalFinalizarVisible(false);
    limparCarrinho();
    alert('Pedido enviado com sucesso! 💖');
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
        <TouchableOpacity onPress={() => diminuirQuantidade(item.id)} style={styles.botao}>
          <Text style={styles.botaoTexto}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => aumentarQuantidade(item.id)} style={styles.botao}>
          <Text style={styles.botaoTexto}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setItemParaRemover(item)}
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

      {nome && telefone && (
        <View style={styles.clienteInfo}>
          <Text style={styles.clienteTexto}>👤 {nome}</Text>
          <Text style={styles.clienteTexto}>📞 {telefone}</Text>
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
            onPress={() => setModalFinalizarVisible(true)}
          >
            <Text style={styles.finalizarTexto}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de Finalização */}
      <Modal transparent visible={modalFinalizarVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Finalizar Pedido</Text>
            <Text style={styles.modalMensagem}>
              Deseja realmente finalizar o pedido?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setModalFinalizarVisible(false)}
              >
                <Text style={styles.textobotao}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={confirmarFinalizacao}
              >
                <Text style={styles.textobotao}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Remoção */}
      <Modal transparent visible={!!itemParaRemover} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remover Item</Text>
            <Text style={styles.modalMensagem}>
              Deseja remover "{itemParaRemover?.nome}" do carrinho?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setItemParaRemover(null)}
              >
                <Text style={styles.textobotao}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  if (itemParaRemover) {
                    removerDoCarrinho(itemParaRemover.id);
                    setItemParaRemover(null);
                  }
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
    fontFamily: 'Comfortaa',
    color: '#ff375b',
  },
  clienteInfo: { marginBottom: 20 },
  clienteTexto: { fontSize: 16, color: '#333', fontFamily: 'Comfortaa' },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fdfdfd',
  },
  itemInfo: { marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: 'bold', fontFamily: 'Comfortaa' },
  preco: { fontSize: 14, color: '#555', fontFamily: 'Comfortaa' },
  subtotal: { fontSize: 14, color: '#000', fontFamily: 'Comfortaa' },
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
    fontFamily: 'Comfortaa',
  },
  botaoFinalizar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  finalizarTexto: {
    color: '#ff375b',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Comfortaa',
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
    fontFamily: 'Comfortaa',
  },
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
    fontFamily: 'Comfortaa',
    marginBottom: 10,
    color: '#ff375b',
  },
  modalMensagem: {
    fontFamily: 'Comfortaa',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    backgroundColor: '#ff375b',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textobotao: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Comfortaa',
  },
});

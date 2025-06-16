import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ListRenderItem,
} from 'react-native';
import { CarrinhoContext } from '../context/carrinhoContext';
import { ItemCarrinho } from '../types';

export default function Carrinho() {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    total,
  } = useContext(CarrinhoContext);

  const confirmarLimpar = () => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm('Deseja limpar o carrinho?');
      if (confirmar) {
        limparCarrinho();
      }
    } else {
      Alert.alert(
        'Confirmar',
        'Deseja limpar o carrinho?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Limpar', onPress: limparCarrinho, style: 'destructive' },
        ]
      );
    }
  };

  const confirmarRemover = (id: number, nome: string) => {
  if (Platform.OS === 'web') {
    const confirmar = window.confirm(`Remover "${nome}" do carrinho?`);
    if (confirmar) {
      removerDoCarrinho(id);
    }
  } else {
    Alert.alert(
      'Confirmar remoção',
      `Deseja remover "${nome}" do carrinho?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => removerDoCarrinho(id), style: 'destructive' },
      ]
    );
  }
};


  const renderItem: ListRenderItem<ItemCarrinho> = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={() => aumentarQuantidade(item.id)}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => diminuirQuantidade(item.id)}>
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#ff4444' }]}
          onPress={() => confirmarRemover(item.id, item.nome)}
        >
          <Text style={styles.botaoTexto}>Remover</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.limparBotao} onPress={confirmarLimpar}>
            <Text style={styles.limparTexto}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  vazio: { fontSize: 16, textAlign: 'center', marginTop: 50, color: '#666' },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  botoes: { justifyContent: 'space-between', alignItems: 'center' },
  botao: {
    backgroundColor: '#ff375b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginVertical: 3,
    minWidth: 70,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginTop: 10 },
  limparBotao: {
    marginTop: 15,
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  limparTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

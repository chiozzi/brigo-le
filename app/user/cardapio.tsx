import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CarrinhoContext } from '../context/carrinhoContext';
import { Produto } from '../types';
import { useRouter } from 'expo-router';

const brigadeiros: Produto[] = [
  {
    id: 1,
    nome: 'Brigadeiro Ao Leite',
    preco: 3.5,
    descricao: 'Delicioso brigadeiro tradicional',
    imagem: require('../../assets/images/sabores/1.png'),
  },
  {
    id: 2,
    nome: 'Brigadeiro Ao Leite com Morango',
    preco: 3.5,
    descricao: 'Delicioso brigadeiro tradicional',
    imagem: require('../../assets/images/sabores/2.png'),
  },
  {
    id: 3,
    nome: 'Brigadeiro Branco',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/3.png'),
  },
  {
    id: 4,
    nome: 'Brigadeiro Branco com Morango',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/4.png'),
  },
  {
    id: 5,
    nome: 'Brigadeiro de Churros ',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/5.png'),
  },
  {
    id: 6,
    nome: 'Brigadeiro de Coco ',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/6.png'),
  },
  {
    id: 7,
    nome: 'Brigadeiro Meio Amargo ',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/7.png'),
  },
  {
    id: 8,
    nome: 'Brigadeiro de Morango',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/8.png'),
  },
  {
    id: 9,
    nome: 'Brigadeiro de Ninho',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/9.png'),
  },
  {
    id: 10,
    nome: 'Brigadeiro de Ninho com Nutella',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/10.png'),
  },
  {
    id: 11,
    nome: 'Brigadeiro de Oreo',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/11.png'),
  },
  {
    id: 12,
    nome: 'Brigadeiro de Paçoca',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/12.png'),
  },
  {
    id: 13,
    nome: 'Brigadeiro de Prestígio',
    preco: 3.5,
    descricao: '',
    imagem: require('../../assets/images/sabores/13.png'),
  },
];

export default function Cardapio() {
  const { carrinho, adicionarAoCarrinho } = useContext(CarrinhoContext);
  const router = useRouter();

  const handleAdicionar = (produto: Produto) => {
    adicionarAoCarrinho(produto);
  };

  const totalItensNoCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => handleAdicionar(item)}>
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cardápio de Brigadeiros</Text>
      <FlatList
        data={brigadeiros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      {totalItensNoCarrinho > 0 && (
        <TouchableOpacity style={styles.carrinhoContainer} onPress={() => router.push('/user/carrinho')}>
          <Text style={styles.carrinhoTexto}>🛒 Ver Carrinho ({totalItensNoCarrinho})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    elevation: 2,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  info: { flex: 1, padding: 10, justifyContent: 'space-between' },
  nome: { fontSize: 18, fontWeight: 'bold' },
  descricao: { fontSize: 14, color: '#666', marginBottom: 4 },
  preco: { fontSize: 16, color: '#555' },
  botao: {
    backgroundColor: '#ff375b',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  carrinhoContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff375b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
  },
  carrinhoTexto: { color: '#fff', fontWeight: 'bold' },
});

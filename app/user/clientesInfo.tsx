import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CarrinhoContext } from '../context/carrinhoContext';

export default function InformacoesCliente() {
  const router = useRouter();
  const { carrinho, total } = useContext(CarrinhoContext);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleContinuar = () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha nome e telefone.');
      return;
    }
    if (carrinho.length === 0) {
      Alert.alert('Erro', 'Seu carrinho está vazio.');
      return;
    }

    // Passar os dados para a próxima tela ou enviar pedido direto aqui
    router.push({
      pathname: '/user/carrinho',
      params: { nome, telefone },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Informações do Cliente</Text>

      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinuar}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#482b1a',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#ff375b',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function InformacoesCliente() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const validarTelefone = (tel: string) => {
    // Exemplo simples: verificar se tem só números e 10 ou 11 dígitos
    const regex = /^\d{10,11}$/;
    return regex.test(tel);
  };

  const enviarDados = () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!validarTelefone(telefone)) {
      Alert.alert('Erro', 'Telefone inválido. Digite apenas números, com 10 ou 11 dígitos.');
      return;
    }

    // Navega para o carrinho passando nome e telefone como params na query
    router.push({
      pathname: '/user/carrinho',
      params: { nome, telefone },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Informações do Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone (somente números)"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        maxLength={11}
      />

      <TouchableOpacity style={styles.botao} onPress={enviarDados}>
        <Text style={styles.botaoTexto}>Continuar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

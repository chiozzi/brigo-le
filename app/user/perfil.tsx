import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { ClienteContext } from '../context/clienteContext';
import { salvarCliente } from '../services/salvarCliente';

export default function Perfil() {
  const { cliente, setCliente } = useContext(ClienteContext);
  const [editNome, setEditNome] = useState(cliente.nome);
  const [editTelefone, setEditTelefone] = useState(cliente.telefone);
  const [isValid, setIsValid] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);

  useEffect(() => {
    setEditNome(cliente.nome);
    setEditTelefone(cliente.telefone);
  }, [cliente]);

  useEffect(() => {
    const nomeOk = editNome.trim().length > 0;
    const telOk = editTelefone.trim().replace(/\D/g, '').length >= 10;
    setIsValid(nomeOk && telOk);
  }, [editNome, editTelefone]);

  const solicitarConfirmacao = () => {
    if (!isValid) {
      Alert.alert('Erro', 'Preencha corretamente seu nome e telefone.');
      return;
    }
    setModalConfirmar(true);
  };

  const confirmarSalvar = async () => {
    const dadosAtualizados = {
        nome: editNome.trim(),
        telefone: editTelefone.trim(),
    };

    setCliente(dadosAtualizados);
    setModalConfirmar(false);

    try {
        await salvarCliente(dadosAtualizados);
        Alert.alert('Tudo certo!', 'Suas informações foram salvas com sucesso. 😊');
    } catch (error) {
        console.error('Erro ao salvar no Firestore:', error);
        Alert.alert('Erro', 'Não foi possível salvar seus dados no momento.');
    }
    };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.titulo}>👤 Meu Perfil</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={editNome}
              onChangeText={setEditNome}
              style={styles.input}
              placeholder="Seu nome completo"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              value={editTelefone}
              onChangeText={setEditTelefone}
              style={styles.input}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
              maxLength={15}
            />
          </View>

          <TouchableOpacity
            style={[styles.botao, !isValid && styles.botaoDesativado]}
            onPress={solicitarConfirmacao}
            disabled={!isValid}
          >
            <Text style={styles.botaoTexto}>Salvar informações</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de confirmação */}
        <Modal transparent visible={modalConfirmar} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmar Alterações</Text>
              <Text style={styles.modalMensagem}>
                Nome: {editNome}{'\n'}Telefone: {editTelefone}
              </Text>
              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                  onPress={() => setModalConfirmar(false)}
                >
                  <Text style={[styles.botaoTexto, { color: '#333' }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={confirmarSalvar}
                >
                  <Text style={styles.botaoTexto}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    marginTop: 16,
    backgroundColor: '#ff375b',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMensagem: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBtns: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#ff375b',
    alignItems: 'center',
  },
});

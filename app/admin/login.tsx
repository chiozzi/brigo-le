import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Lobster: require('../../assets/fonts/Lobster-Regular.ttf'),
    Comfortaa: require('../../assets/fonts/Comfortaa-Regular.ttf'),
  });

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalErro, setModalErro] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  const login = () => {
    if (!email || !senha) {
      setMsgErro('Preencha email e senha.');
      setModalErro(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setEmail('');
        setSenha('');
        setModalSucesso(true);
      })
      .catch((error) => {
        setMsgErro('Email ou senha inválidos.');
        setModalErro(true);
      });
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.titulo}>Login Admin</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              returnKeyType="done"
              onSubmitEditing={login}
            />

            <Pressable style={styles.botao} onPress={login}>
              <Text style={styles.textoBotao}>Entrar</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Modal de erro */}
      <Modal transparent animationType="fade" visible={modalErro}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Erro</Text>
            <Text style={styles.modalMensagem}>{msgErro}</Text>
            <Pressable style={styles.modalBtn} onPress={() => setModalErro(false)}>
              <Text style={styles.textoBotao}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal de sucesso */}
      <Modal transparent animationType="fade" visible={modalSucesso}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sucesso!</Text>
            <Text style={styles.modalMensagem}>Login realizado com sucesso.</Text>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                setModalSucesso(false);
                router.push('/admin/dashboard');
              }}
            >
              <Text style={styles.textoBotao}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc1d5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  },
  titulo: {
    fontFamily: 'Lobster',
    fontSize: 48,
    color: '#ff375b',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ff375b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontFamily: 'Comfortaa',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#ff375b',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: 'center',
    width: '100%',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Comfortaa',
    fontWeight: 'bold',
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
    borderRadius: 20,
    padding: 30,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Comfortaa',
    fontSize: 22,
    marginBottom: 15,
    color: '#ff375b',
  },
  modalMensagem: {
    fontFamily: 'Comfortaa',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: '#ff375b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
});

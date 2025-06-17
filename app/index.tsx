import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './services/firebaseConfig';

export default function RootIndex() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Lobster: require('../assets/fonts/Lobster-Regular.ttf'),
    Comfortaa: require('../assets/fonts/Comfortaa-Regular.ttf'),
  });

  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroModalVisible, setErroModalVisible] = useState(false);

  // ref para input de senha, tipado corretamente
  const senhaInputRef = useRef<TextInput>(null);

  if (!fontsLoaded) return null;

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      setEmail('');
      setSenha('');
      setAdminModalVisible(false);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error(error);
      setErroModalVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containertitulos}>
        <Text style={styles.titulo}>brigo.le</Text>
        <Text style={styles.subtitulo}>
          Se for pra adoçar, que seja com brigadeiro!
        </Text>
      </View>

      <Image
        style={styles.imagem}
        source={require('../assets/images/brigadeiro.png')}
      />

      <View style={styles.containerbotao}>
        <Text style={styles.textoarea}>Selecione sua área:</Text>

        <Pressable style={styles.botao} onPress={() => router.push('/user/home')}>
          <Text style={styles.textobotao}>Cliente</Text>
        </Pressable>

        <Pressable style={styles.botao} onPress={() => setAdminModalVisible(true)}>
          <Text style={styles.textobotao}>Admin</Text>
        </Pressable>
      </View>

      {/* Modal de Login Admin */}
      <Modal
        transparent
        animationType="slide"
        visible={adminModalVisible}
        onRequestClose={() => setAdminModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login Admin</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => {
                senhaInputRef.current?.focus();
              }}
              blurOnSubmit={false}
            />

            <TextInput
              ref={senhaInputRef}
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setAdminModalVisible(false)}
              >
                <Text style={styles.textobotao}>Cancelar</Text>
              </Pressable>

              <Pressable style={styles.modalBtn} onPress={handleLogin}>
                <Text style={styles.textobotao}>Entrar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>


      {/* Modal de Erro */}
      <Modal transparent animationType="fade" visible={erroModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Acesso negado</Text>
            <Text style={styles.modalMensagem}>Email ou senha incorretos.</Text>
            <Pressable
              style={styles.modalBtn}
              onPress={() => setErroModalVisible(false)}
            >
              <Text style={styles.textobotao}>Fechar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc1d5',
  },
  containertitulos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 62,
    fontFamily: 'Lobster',
    color: '#ff375b',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontFamily: 'Comfortaa',
    color: '#482b1a',
    textAlign: 'center',
  },
  imagem: {
    alignSelf: 'center',
    width: 180,
    height: 180,
  },
  containerbotao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  textoarea: {
    fontSize: 18,
    fontFamily: 'Comfortaa',
    marginBottom: 20,
    textAlign: 'center',
  },
  botao: {
    borderRadius: 50,
    backgroundColor: '#ff375b',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  textobotao: {
    color: '#fff',
    fontSize: 20,
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
    marginBottom: 15,
  },
  modalMensagem: {
    fontFamily: 'Comfortaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontFamily: 'Comfortaa',
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
});

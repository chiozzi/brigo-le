  import React, { useState } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Modal,
    TextInput,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
  } from 'react-native';
  import { useRouter } from 'expo-router';
  import { useFonts } from 'expo-font';
  import { KeyboardAvoidingView, Platform } from 'react-native';


  export default function RootIndex() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
      Lobster: require('../assets/fonts/Lobster-Regular.ttf'),
      Comfortaa: require('../assets/fonts/Comfortaa-Regular.ttf'),
    });

    const [adminModalVisible, setAdminModalVisible] = useState(false);
    const [senhaDigitada, setSenhaDigitada] = useState('');

    const verificarSenha = () => {
      const senhaCorreta = '140706';
      if (senhaDigitada === senhaCorreta) {
        setAdminModalVisible(false);
        setSenhaDigitada('');
        router.push('/admin/dashboard');
      } else {
          if (Platform.OS === 'web') {
            alert('Acesso negado:\nSenha incorreta!');
          } else {
            Alert.alert('Acesso negado', 'Senha incorreta!');
          }
          setSenhaDigitada('');
        }
    };

    const handleAdminAccess = () => {
      setAdminModalVisible(true);
    };

    if (!fontsLoaded) return null;

    return (
      <View style={styles.container}>
        <View style={styles.containertitulos}>
          <Text style={styles.titulo}>brigo.le</Text>
          <Text style={styles.subtitulo}>
            Se for pra adoçar, que seja com brigadeiro!
          </Text>
        </View>

        <View>
          <Image
            style={styles.imagem}
            source={require('../assets/images/brigadeiro.png')}
          />
        </View>

        <View style={styles.containerbotao}>
          <Text style={styles.textoarea}>Selecione sua área:</Text>

          <Pressable style={styles.botao} onPress={() => router.push('/user/home')}>
            <Text style={styles.textobotao}>Cliente</Text>
          </Pressable>

          <Pressable style={styles.botao} onPress={handleAdminAccess}>
            <Text style={styles.textobotao}>Admin</Text>
          </Pressable>
        </View>

      {/* Modal de senha */}
        <Modal
          transparent
          animationType="slide"
          visible={adminModalVisible}
          onRequestClose={() => setAdminModalVisible(false)}
          >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Área restrita</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite a senha"
                  secureTextEntry
                  value={senhaDigitada}
                  onChangeText={setSenhaDigitada}
                  onSubmitEditing={verificarSenha}
                  blurOnSubmit={false}
                  autoFocus
                  editable={true}
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.modalBtn}
                    onPress={() => setAdminModalVisible(false)}
                  >
                    <Text style={styles.textobotao}>Cancelar</Text>
                  </Pressable>
                  <Pressable style={styles.modalBtn} onPress={verificarSenha}>
                    <Text style={styles.textobotao}>Entrar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
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
      width: '100%'
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

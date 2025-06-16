import { View, Text, Button, StyleSheet, Linking } from 'react-native';

export default function Contato() {
  const abrirWhatsApp = () => {
    const numero = '5511999999999'; // substitua pelo número real
    const mensagem = 'Olá! Quero fazer um pedido de brigadeiros.';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contato / Encomendas</Text>
      <Button title="Enviar mensagem pelo WhatsApp" onPress={abrirWhatsApp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
});

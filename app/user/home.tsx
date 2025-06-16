import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const saboresPopulares = [
    { nome: 'Ao Leite', img: require('../../assets/images/sabores/1.png') },
    { nome: 'Ninho c/ Nutella', img: require('../../assets/images/sabores/10.png') },
    { nome: 'Paçoca', img: require('../../assets/images/sabores/12.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Título inicial */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Bem-vindo ao BrigoLê!</Text>
        <Text style={styles.subtitulo}>Brigadeiros gourmet feitos com carinho.</Text>
      </View>

      {/* Hero / Banner */}
      <LinearGradient colors={['#ffb6c1', '#fff']} style={styles.banner}>
        <Text style={styles.bannerTitle}>Brigadeiros gourmet feitos com amor 💕</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/user/cardapio')}>
          <Text style={styles.buttonText}>Ver Cardápio</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Botões principais */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/user/carrinho')}>
          <Text style={styles.navButtonText}>🛒 Meu Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/user/sobre')}>
          <Text style={styles.navButtonText}>📖 Sobre a Marca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/user/contato')}>
          <Text style={styles.navButtonText}>📞 Contato / Encomendas</Text>
        </TouchableOpacity>
      </View>

      {/* Sabores Populares */}
      <Text style={styles.sectionTitle}>Sabores Populares</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.saborList}>
        {saboresPopulares.map((sabor, index) => (
          <View key={index} style={styles.card}>
            <Image source={sabor.img} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{sabor.nome}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Diferenciais */}
      <Text style={styles.sectionTitle}>Por que escolher a gente?</Text>
      <View style={styles.features}>
        <Text style={styles.featureItem}>✅ Ingredientes selecionados</Text>
        <Text style={styles.featureItem}>🚚 Entrega rápida e segura</Text>
        <Text style={styles.featureItem}>💖 Receita artesanal exclusiva</Text>
      </View>

      {/* Botão WhatsApp */}
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={() => Linking.openURL('https://wa.me/5511956005280')}
      >
        <Text style={styles.whatsappText}>💬 Fale conosco no WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#fff0f5',
  },
  titulo: {
    fontSize: 36,
    fontFamily: 'Lobster',
    color: '#482b1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    fontFamily: 'Comfortaa',
    color: '#7c3f27',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  banner: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontFamily: 'sans-serif',
    color: '#482b1a',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff375b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navButtons: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: '#ff375b',
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#ff375b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  navButtonText: {
    color: '#ffc1d5',
    fontSize: 18,
    fontFamily: 'Comfortaa',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#482b1a',
    margin: 15,
  },
  saborList: {
    paddingLeft: 15,
  },
  card: {
    marginRight: 15,
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  cardTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#482b1a',
  },
  features: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 25,
    margin: 20,
    alignItems: 'center',
  },
  whatsappText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

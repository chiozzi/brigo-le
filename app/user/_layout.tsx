import { Tabs, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Platform, Pressable } from 'react-native';

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,               // Remove os nomes das abas
        tabBarActiveTintColor: '#ff375b',     // rosa forte
        tabBarInactiveTintColor: '#482b1a',   // rosa fraco
        tabBarStyle: {
          backgroundColor: '#ffc1d5',         // marrom forte
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: Platform.OS === 'ios' ? 20 : 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 12,
        },
        headerStyle: {
          backgroundColor: '#ffc1d5',         // marrom fraco no header
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        },
        headerTintColor: '#7c3f27',            // rosa fraco no texto do header
        headerTitleStyle: {
          fontFamily: 'Lobster',
          fontWeight: 'normal',
          fontSize: 28,
        },
        headerLeft: () => (
          <Pressable
            onPress={() => router.back()}
            style={{ paddingHorizontal: 15 }}
          >
            <FontAwesome name="arrow-left" size={24} color="#7c3f27" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Página Inicial',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size + 5} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cardapio"
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size + 5} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size + 5} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contato"
        options={{
          title: 'Contato',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="phone" size={size + 5} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="info-circle" size={size + 5} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

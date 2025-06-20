import { Tabs, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform, Pressable } from 'react-native';

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ff375b',
        tabBarInactiveTintColor: '#482b1a',
        tabBarStyle: {
          backgroundColor: '#ffc1d5',
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
          backgroundColor: '#ffc1d5',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        },
        headerTintColor: '#7c3f27',
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
            <FontAwesome5 name="arrow-left" size={24} color="#7c3f27" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Página Inicial',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cardapio"
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="utensils" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-basket" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="info" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-circle" size={size + 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

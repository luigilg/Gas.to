import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStaticNavigationx } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Detalhes(){
  <View style={s.um}>
    <Text>Detalhess</Text>
  </View>
}

function HomeScreen() {
  return (
    <View style={s.container}>
        <View style={s.cTitulo}>
            <Text style={s.titulo}>
                Gas<Text style={{color: '#40b82c'}}>.</Text>to
            </Text>
        </View>
        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Overview', headerShown: false, }}
      />
      <Stack.Screen name="Details" component={Detalhes} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  container: {
      padding: 20,
      backgroundColor: '#232323',
      height: '100%',
  },
  cTitulo:{
      marginTop: 40,
      marginBottom: 40,
  },
  titulo: {
      color: '#EAEAEA',
      fontFamily: 'P8',
      fontSize: 60, 
      fontWeight: 'bold',
  },
  dot: {
      color: '#40b82c',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default Inicio

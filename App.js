import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black, } from '@expo-google-fonts/poppins';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCurrentDate=()=>{
 
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  if (month < 10) month = "0" + month;

  return date + '/' + month + '/' + year;
}

const setConsumoUrb = async (consumo, data, valorLitro) => {
  await AsyncStorage.setItem('consumoUrb', consumo);
  await AsyncStorage.setItem('dataUrb', data);
  await AsyncStorage.setItem('valorLitroUrb', valorLitro);
};

const getConsumoUrb = async (tipo) => {
  
  try {
    const consumo = await AsyncStorage.getItem('consumoUrb');
    const data = await AsyncStorage.getItem('dataUrb');
    const valorLitro = await AsyncStorage.getItem('valorLitroUrb');
    
    if (tipo == 'consumo') {
      if (consumo !== null) {
        return consumo;
      } else {
        return "--";
      }
    } else if (tipo == 'data') {
      if (data !== null) {
        return data;
      } else {
        return "--";
      }
    } else if (tipo == 'valorLitro') {
      if (valorLitro !== null) {
        let valorLitroFormatado = parseFloat(valorLitro.replace(",", "."));
        return valorLitroFormatado;
      } else {
        return "--";
      }
    } else {
      console.log("Tipo errado ao tentar getConsumoUrb");
    }
  } catch (e) {
    console.log("Erro ao tentar getConsumoUrb()");
    return "Erro ao carregar";
  }
};

const setConsumoEst = async (consumo, data, valorLitro) => {
  await AsyncStorage.setItem('consumoEst', consumo);
  console.log("setConsumoEst" + consumo);
  await AsyncStorage.setItem('dataEst', data);
  await AsyncStorage.setItem('valorLitroEst', valorLitro);
};

const getConsumoEst = async (tipo) => {
  try {
    const consumo = await AsyncStorage.getItem('consumoEst');
    const data = await AsyncStorage.getItem('dataEst');
    const valorLitro = await AsyncStorage.getItem('valorLitroEst');

    if (tipo === 'consumo') {
      return consumo !== null ? consumo : "--";
    } else if (tipo === 'data') {
      if (data !== null) {
        return data;
      } else {
        return "--";
      }
    } else if (tipo === "valorLitro") {
      if (valorLitro !== null) {
        let valorLitroFormatado = parseFloat(valorLitro.replace(",", "."));
        return valorLitroFormatado;
      } else {
        return "--";
      }
    } else {
      console.log("Tipo errado ao tentar getConsumoEst");
      return "Erro ao carregar"; // Certifique-se de retornar algo em caso de tipo inválido
    }
  } catch (e) {
    console.log("Erro ao tentar getConsumoEst()");
    console.error(e); // Adiciona o erro ao log para mais informações
    return "Erro ao carregar";
  }

};

function HomeScreen({ navigation, route }) {
  console.log("Inicio");

  const [consumoUrb, setConsumoUrbState] = useState("Carregando...");
  const [consumoEst, setConsumoEstState] = useState("Carregando...");
  const [valorLitroUrb, setValorLitroUrb] = useState("Carregando...");
  const [dataUrb, setDataUrb] = useState('--');
  const [dataEst, setDataEst] = useState('--');
  const [valorLitroEst, setValorLitroEst] = useState('--');
  const [hasConsumoEst, setHasConsumoEst] = useState(false);
  const [expandedUrb, setExpandedUrb] = useState(false);
  const [expandedEst, setExpandedEst] = useState(false);

  const fetchConsumoUrb = useCallback(async () => {
    const consumoValue = await getConsumoUrb('consumo');
    setConsumoUrbState(consumoValue);

    const dataValue = await getConsumoUrb('data');
    setDataUrb(dataValue);
    
    const valorLitroValue = await getConsumoUrb('valorLitro');
    setValorLitroUrb(valorLitroValue);
  }, []);

  const fetchConsumoEst = useCallback(async () => {
    const consumoValue = await getConsumoEst('consumo');
    setConsumoEstState(consumoValue);

    const dataValue = await getConsumoEst('data');
    setDataEst(dataValue);

    const valorLitroValue = await getConsumoEst('valorLitro');
    setValorLitroEst(valorLitroValue);
  }, []);

  const checkConsumoEst = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('consumoEst');
      setHasConsumoEst(value !== null);
    } catch (e) {
      console.log("Erro ao tentar verificar consumo estimado");
      setHasConsumoEst(false);
    }
  }, []);

  const handleRemoveConsumoUrb = async () => {
    await AsyncStorage.removeItem('consumoUrb');
    await AsyncStorage.removeItem('dataUrb');
    await AsyncStorage.removeItem('valorLitroUrb');
    navigation.navigate('Home', { update: true });
  };
  
  const handleRemoveConsumoEst = async () => {
    await AsyncStorage.removeItem('consumoEst');
    await AsyncStorage.removeItem('dataEst');
    await AsyncStorage.removeItem('valorLitroEst');
    navigation.navigate('Home', { update: true });
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchConsumoUrb();
      fetchConsumoEst();
      checkConsumoEst();
    }, [fetchConsumoUrb, fetchConsumoEst, checkConsumoEst])
  );

  useEffect(() => {
    if (route.params?.update) {
      fetchConsumoUrb();
      fetchConsumoEst();
      checkConsumoEst();
    }
  }, [route.params, fetchConsumoUrb, fetchConsumoEst, checkConsumoEst]);

  const alertaConsumoEst = () =>
    Alert.alert('Consumo estrada ausente', 'Você precisa adicionar um consumo de estrada antes de poder calcular gastos para viagem.', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'color: "#EBAF17"',
      },
      { text: 'Adicionar', onPress: () => navigation.navigate('MedEst') },
    ]);

  const expandirUrb = () => {
    setExpandedUrb(!expandedUrb);
  };
  const expandirEst = () => {
    setExpandedEst(!expandedEst);
  };

  return (
    <View style={s.container}>
      <View style={s.cTitulo}>
        <TouchableOpacity onPress={() => console.log(consumoEst)}>
          <Text style={s.titulo}>
            Gas<Text style={{ color: '#ebaf17' }}>.</Text>to
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[s.card, s.dividerBottom1]}>
        <View style={[s.row]}>
          <TouchableOpacity style={s.consumo} onPress={() => expandirUrb()}>
            <Text style={s.txtConsumo}>Consumo urbano</Text>
            <Text style={s.nConsumo}>{consumoUrb} km/L</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.botao, s.btNovaMed]} onPress={() => navigation.navigate('MedUrb')}>
            <Text style={[s.txtBotao, { fontSize: 40 }]}>+</Text>
          </TouchableOpacity>
        </View>
        {expandedUrb && (
            <View style={s.row2}>
              <View style={{paddingHorizontal: 5, marginRight: '5%', width: '75%'}}>
                <Text style={[s.txtPadrao, s.row2, { marginBottom:10, fontSize: 17}]}>
                  Última medição: <Text style={s.ultimaMed}>{dataUrb}</Text>
                </Text>
                <Text style={[s.txtPadrao, { fontSize: 17}]}>
                  Valor do litro: <Text style={s.ultimaMed}>{valorLitroUrb.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                </Text>
              </View>
              <TouchableOpacity style={[s.botao, { backgroundColor: '#DD4444', width: '20%' }]} onPress={handleRemoveConsumoUrb}>
                <Text style={[s.txtBotao, { fontSize: 27, fontFamily: 'Poppins_900Black' }]}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
        )}
      </View>
      <View style={[s.card, s.dividerBottom1]}>
        <View style={[s.row]}>
          <TouchableOpacity style={s.consumo} onPress={() => expandirEst()}>
            <Text style={s.txtConsumo}>Consumo estrada</Text>
            <Text style={s.nConsumo}>{consumoEst} km/L</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.botao, s.btNovaMed]} onPress={() => navigation.navigate('MedEst')}>
            <Text style={[s.txtBotao, { fontSize: 40 }]}>+</Text>
          </TouchableOpacity>
        </View>
        {expandedEst && (
          <View style={s.row2}>
          <View style={{paddingHorizontal: 5, marginRight: '5%', width: '75%'}}>
            <Text style={[s.txtPadrao, s.row2, { marginBottom:10, fontSize: 17}]}>
              Última medição: <Text style={s.ultimaMed}>{dataEst}</Text>
            </Text>
            <Text style={[s.txtPadrao, { fontSize: 17}]}>
              Valor do litro: <Text style={s.ultimaMed}>{valorLitroEst.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
            </Text>
          </View>
          <TouchableOpacity style={[s.botao, { backgroundColor: '#DD4444', width: '20%' }]} onPress={handleRemoveConsumoEst}>
            <Text style={[s.txtBotao, { fontSize: 27, fontFamily: 'Poppins_900Black' }]}>
              X
            </Text>
          </TouchableOpacity>
        </View>
        )}
      </View>
      {hasConsumoEst ? (
        <TouchableOpacity style={s.botao} onPress={() => navigation.navigate('GastoViagem')}>
          <Text style={s.txtBotao}>Calcular gasto para viagem</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={s.botaoDisabled} onPress={() => alertaConsumoEst()}>
          <Text style={s.txtBotao}>Calcular gasto para viagem</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function MedUrb({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [consumoMedido, setConsumoMedido] = useState('');
  const [km1, setKm1] = useState('');
  const [km2, setKm2] = useState('');
  const [litros, setLitros] = useState('');
  const [valorDoLitro, setValorDoLitro] = useState('');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }
  const changeKm1 = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let formattedText = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setKm1(formattedText);
  };

  const changeKm2 = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let formattedText = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setKm2(formattedText);
  };

  const changeLitros = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setLitros(formattedText);
  };

  const changeValorDoLitro = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setValorDoLitro(formattedText);
  };
  
  const changeConsumoMedido = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setConsumoMedido(formattedText);
  };

  const parseNumber = (text) => {
    return parseFloat(text.replace(/\./g, '').replace(',', '.'));
  };
  
  const temInput = () => {
    return consumoMedido.trim() !== '' && consumoMedido !== '0,0' && valorDoLitro.trim() !== '' && valorDoLitro !== '0,0';
  };

  const temInputs = () => {
    return km1.trim() !== '' && km2.trim() !== '' && litros.trim() !== '' && litros !== '0,0' && valorDoLitro.trim() !== '' && valorDoLitro !== '0,0';
  };

  const formatNumber = (number) => {
    return number.toString().replace('.', ',');
  };

  const consumoCalculado = Math.abs(temInputs() ? ((parseNumber(km2) - parseNumber(km1)) / parseNumber(litros)) : 0);
  const consumoMed = parseNumber(consumoMedido);

  const consumoCalculadoFormatado = formatNumber(consumoCalculado.toFixed(2));
  const consumoMedidoFormatado = formatNumber(consumoMed.toFixed(2));

  const adicionar = () => {
    consumoUrbano = consumoCalculadoFormatado;
    setConsumoUrb(consumoCalculadoFormatado, getCurrentDate(),valorDoLitro);
    navigation.goBack();
    navigation.navigate('Home', { update: true });
  }
  
  const adicionarMed = () => {
    consumoUrbano = consumoMedidoFormatado;
    setConsumoUrb(consumoMedidoFormatado, getCurrentDate(), valorDoLitro);
    navigation.goBack();
    navigation.navigate('Home', { update: true });
  }

  return (
    <View style={s.container}>
      <View style={s.cTitulo2}>
        <View style={s.cArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{ height: 36, width: 36 }} source={require('./assets/voltar.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={s.titulo2}>Nova Medição</Text>
          <Text style={s.titulo3}>Urbana</Text>
        </View>
      </View>
      <ScrollView style={s.scroll}>
        <View style={[s.opcao]}>
          <Text style={[s.txtPadrao, {color: '#ebaf17'}]}>Já tem o consumo medido?</Text>
          <Switch
            name='opcao'
            trackColor={{ false: '#232323', true: '#ebaf17' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginLeft: 15 }}
          />
        </View>
        {isEnabled ? (
          <View>
            <View style={s.dividerBottom2}>
              <Text style={s.titulo4}>Digite o consumo medido:</Text>
              <TextInput
                style={s.input}
                value={consumoMedido}
                onChangeText={changeConsumoMedido}
                keyboardType="numeric"
                placeholder="km/L"
                placeholderTextColor="#555555"
                />
                <Text style={s.titulo4}>Valor do litro abastecido:</Text>
                <TextInput
                  style={s.input}
                  value={valorDoLitro}
                  onChangeText={changeValorDoLitro}
                  keyboardType="numeric"
                  placeholder="R$"
                  placeholderTextColor="#555555"
                />
            </View>
            {!temInput() &&
            <View>
              <View style={s.resultado2}>
                <Text style={s.txtConsumo}>Consumo Urbano:</Text>
                <Text style={[s.nConsumo, s.txtBranco]}>Digite os dados</Text>
              </View>
              <TouchableOpacity style={s.botaoDisabled} disabled>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
            {temInput() &&
            <View>
              <View style={s.resultado1}>
                <Text style={s.txtConsumo}>Consumo Urbano:</Text>
                <Text style={s.nConsumo}>{consumoMedidoFormatado} km/L</Text>
              </View>
              <TouchableOpacity style={s.botao} onPress={adicionarMed}>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        ) : (
          <View>

            <View style={s.dividerBottom2}>
              <Text style={s.titulo4}>Quilometragem 1</Text>
              <TextInput
                style={s.input}
                value={km1}
                onChangeText={changeKm1}
                keyboardType="numeric"
                placeholder="km"
                placeholderTextColor="#555555"
              />
              <Text style={s.titulo4}>Quilometragem 2</Text>
              <TextInput
                style={s.input}
                value={km2}
                onChangeText={changeKm2}
                keyboardType="numeric"
                placeholder="km"
                placeholderTextColor="#555555"
              />
              <Text style={s.titulo4}>Litros</Text>
              <TextInput
                style={s.input}
                value={litros}
                onChangeText={changeLitros}
                keyboardType="numeric"
                placeholder="L"
                placeholderTextColor="#555555"
              />
              <Text style={s.titulo4}>Valor do litro abastecido:</Text>
              <TextInput
                style={s.input}
                value={valorDoLitro}
                onChangeText={changeValorDoLitro}
                keyboardType="numeric"
                placeholder="R$"
                placeholderTextColor="#555555"
              />
            </View>
            {!temInputs() &&
            <View>
              <View style={s.resultado2}>
                <Text style={s.txtConsumo}>Consumo Urbano:</Text>
                <Text style={[s.nConsumo, s.txtBranco]}>Digite os dados</Text>
              </View>
              <TouchableOpacity style={s.botaoDisabled} disabled>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
            {temInputs() &&
            <View>
              <View style={s.resultado1}>
                <Text style={s.txtConsumo}>Consumo Urbano:</Text>
                <Text style={s.nConsumo}>{consumoCalculadoFormatado} km/L</Text>
              </View>
              <TouchableOpacity style={s.botao} onPress={adicionar}>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        )}
        <View style={{marginTop: 100}}></View>
      </ScrollView>
    </View>
  );
}

function MedEst({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [consumoMedido, setConsumoMedido] = useState('');
  const [km1, setKm1] = useState('');
  const [km2, setKm2] = useState('');
  const [litros, setLitros] = useState('');
  const [valorDoLitro, setValorDoLitro] = useState('');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }
  const changeKm1 = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let formattedText = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setKm1(formattedText);
  };

  const changeKm2 = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let formattedText = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setKm2(formattedText);
  };

  const changeLitros = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setLitros(formattedText);
  };

  const changeValorDoLitro = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setValorDoLitro(formattedText);
  };

  const changeConsumoMedido = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setConsumoMedido(formattedText);
  };

  const parseNumber = (text) => {
    return parseFloat(text.replace(/\./g, '').replace(',', '.'));
  };
  
  const temInput = () => {
    return consumoMedido.trim() !== '' && consumoMedido !== '0,0' && valorDoLitro.trim() !== '' && valorDoLitro !== '0,0';
  };

  const temInputs = () => {
    return km1.trim() !== '' && km2.trim() !== '' && litros.trim() !== '' && litros !== '0,0' && valorDoLitro.trim() !== '' && valorDoLitro !== '0,0';
  };

  const formatNumber = (number) => {
    return number.toString().replace('.', ',');
  };

  const consumoCalculado = Math.abs(temInputs() ? ((parseNumber(km2) - parseNumber(km1)) / parseNumber(litros)) : 0);
  const consumoMed = parseNumber(consumoMedido);

  const consumoCalculadoFormatado = formatNumber(consumoCalculado.toFixed(2));
  const consumoMedidoFormatado = formatNumber(consumoMed.toFixed(2));

  const adicionar = () => {
    consumoEstrada = consumoCalculadoFormatado;
    setConsumoEst(consumoCalculadoFormatado, getCurrentDate(), valorDoLitro);
    navigation.goBack();
    navigation.navigate('Home', { update: true });
  }
  
  const adicionarMed = () => {
    consumoEstrada = consumoMedidoFormatado;
    setConsumoEst(consumoMedidoFormatado, getCurrentDate(), valorDoLitro);
    navigation.goBack();
    navigation.navigate('Home', { update: true });
  }

  return (
      <View style={s.container}>
        <View style={s.cTitulo2}>
          <View style={s.cArrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={{ height: 36, width: 36 }} source={require('./assets/voltar.png')} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={s.titulo2}>Nova Medição</Text>
            <Text style={s.titulo3}>Estrada</Text>
          </View>
        </View>
      <ScrollView style={s.scroll}>
        <View style={s.opcao}>
          <Text style={s.txtPadrao2}>Já tem o consumo medido?</Text>
          <Switch
            name='opcao'
            trackColor={{ false: '#232323', true: '#ebaf17' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginLeft: 15 }}
          />
        </View>
        {isEnabled ? (
          <View>
            <View style={s.dividerBottom2}>
              <Text style={s.titulo4}>Digite o consumo medido:</Text>
              <TextInput
                style={s.input}
                value={consumoMedido}
                onChangeText={changeConsumoMedido}
                keyboardType="numeric"
                placeholder="km/L"
                placeholderTextColor="#555555"
                />
                <Text style={s.titulo4}>Valor do litro abastecido:</Text>
                <TextInput
                  style={s.input}
                  value={valorDoLitro}
                  onChangeText={changeValorDoLitro}
                  keyboardType="numeric"
                  placeholder="R$"
                  placeholderTextColor="#555555"
                />
            </View>
            {!temInput() &&
            <View>
              <View style={s.resultado2}>
                <Text style={s.txtConsumo}>Consumo Estrada:</Text>
                <Text style={[s.nConsumo, s.txtBranco]}>Digite os dados</Text>
              </View>
              <TouchableOpacity style={s.botaoDisabled} disabled>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
            {temInput() &&
            <View>
              <View style={s.resultado1}>
                <Text style={s.txtConsumo}>Consumo Estrada:</Text>
                <Text style={s.nConsumo}>{consumoMedidoFormatado} km/L</Text>
              </View>
              <TouchableOpacity style={s.botao} onPress={adicionarMed}>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        ) : (
          <View>

            <View style={s.dividerBottom2}>
              <Text style={s.titulo4}>Quilometragem 1</Text>
              <TextInput
                style={s.input}
                value={km1}
                onChangeText={changeKm1}
                keyboardType="numeric"
                placeholder="km"
                placeholderTextColor="#555555"
              />
              <Text style={s.titulo4}>Quilometragem 2</Text>
              <TextInput
                style={s.input}
                value={km2}
                onChangeText={changeKm2}
                keyboardType="numeric"
                placeholder="km"
                placeholderTextColor="#555555"
              />
              <Text style={s.titulo4}>Litros</Text>
              <TextInput
                style={s.input}
                value={litros}
                onChangeText={changeLitros}
                keyboardType="numeric"
                placeholder="L"
                placeholderTextColor="#555555"
              />
              <Text style={s.titulo4}>Valor do litro abastecido:</Text>
                <TextInput
                  style={s.input}
                  value={valorDoLitro}
                  onChangeText={changeValorDoLitro}
                  keyboardType="numeric"
                  placeholder="R$"
                  placeholderTextColor="#555555"
                />
            </View>
            {!temInputs() &&
            <View>
              <View style={s.resultado2}>
                <Text style={s.txtConsumo}>Consumo Estrada:</Text>
                <Text style={[s.nConsumo, s.txtBranco]}>Digite os dados</Text>
              </View>
              <TouchableOpacity style={s.botaoDisabled} disabled>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
            {temInputs() &&
            <View>
              <View style={s.resultado1}>
                <Text style={s.txtConsumo}>Consumo Estrada:</Text>
                <Text style={s.nConsumo}>{consumoCalculadoFormatado} km/L</Text>
              </View>
              <TouchableOpacity style={s.botao} onPress={adicionar}>
                <Text style={[s.txtBotao,{fontSize: 28}]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        )}
        <View style={{marginTop: 100}}></View>
        </ScrollView>
      </View>
  );
}

function GastoViagem({ navigation, route }) {
  const [switches, setSwitches] = useState({ volta: false, dividir: false, litroSalvo: true });
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [numeroPessoasVolta, setNumeroPessoasVolta] = useState('');
  const [distancia, setDistancia] = useState('');
  const [valorLitro, setValorLitro] = useState('');
  const [valorLitroDig, setValorLitroDig] = useState('');
  const [consumoEst, setConsumoEstState] = useState('');
  
  function check() {
    if (distancia === '') {
      return false;
    } else
  
    if (!switches.volta && !switches.dividir) {
      if (switches.litroSalvo) {
        return '1';
      } else if (valorLitroDig !== '' && valorLitroDig !== '0,0') {
        return '2';
      }
    } else if (!switches.volta && switches.dividir) {
      if (numeroPessoas !== '') {
        if (switches.litroSalvo) {
          return '3';
        } else if (valorLitroDig !== '' && valorLitroDig !== '0,0') {
          return '4';
        }
      }
    } else if (switches.volta && switches.dividir) {
      if (numeroPessoas !== '' && numeroPessoasVolta !== '') {
        if (switches.litroSalvo) {
          return '5';
        } else if (valorLitroDig !== '' && valorLitroDig !== '0,0') {
          return '6';
        }
      }
    } else if (switches.volta && !switches.dividir) {
      if (switches.litroSalvo) {
        return '7';
      } else if (valorLitroDig !== '' && valorLitroDig !== '0,0') {
        return '8';
      }
    }
    return false;
  }

  function check2 () {
    if (distancia !== null && !switches.volta && !switches.dividir && switches.litroSalvo) return 'erro1'
    else if (distancia !== null && !switches.volta && !switches.dividir && !switches.litroSalvo && valorLitroDig !== null && valorLitroDig !== '0,0') return 'erro2'
    else if (distancia !== null && !switches.volta && switches.dividir && numeroPessoas !== null && switches.litroSalvo) return 'erro3'
    else if (distancia !== null && !switches.volta && switches.dividir && numeroPessoas !== null && !switches.litroSalvo && valorLitroDig !== null && valorLitroDig !== '0,0') return 'erro4'
    else if (distancia !== null && switches.volta && switches.dividir && numeroPessoas !== null && numeroPessoasVolta !== null && switches.litroSalvo) return 'erro5'
    else if (distancia !== null && switches.volta && switches.dividir && numeroPessoas !== null && numeroPessoasVolta !== null && !switches.litroSalvo && valorLitroDig != null && valorLitroDig !== '0,0') return 'erro6'
    else if (distancia !== null && switches.volta && !switches.dividir && switches.litroSalvo) return 'erro7'
    else if (distancia !== null && switches.volta && !switches.dividir && !switches.litroSalvo && valorLitroDig !== null && valorLitroDig !== '0,0') return 'erro8'
    else return false;
  }

  const changeNumeroPessoas = (text) => {
    setNumeroPessoas(text);
  }
  const changeNumeroPessoasVolta = (text) => {
    setNumeroPessoasVolta(text);
  }
  const changeDistancia = (text) => {
    setDistancia(text);
  }
  const changeValorLitroDig = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const paddedText = numericText.padStart(3, '0');
    const trimmedText = paddedText.replace(/^0+(?!$)/, '');
    const integerPart = trimmedText.slice(0, -2) || '0';
    const decimalPart = trimmedText.slice(-2);
    let formattedText = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    setValorLitroDig(formattedText);
  }
  
  const toggleSwitch = (name) => {
    setSwitches(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  }

  const gastoTotal = (distance, valorDoLitro) => {
    
    let DIST = parseInt(distance);
    let CONSUMO = parseInt(consumoEst);

    let gastoKm = valorDoLitro/CONSUMO;
    return (gastoKm*DIST);
  }

  const gastoTotal2 = (distance, valorDoLitro) => {
    return (2*gastoTotal(distance, valorDoLitro))
  }

  const formatar = (text) => {
    return parseInt(parseFloat(text.replace(/\./g, '').replace(',', '.')));
  }

  const divisaoPessoas = (dist, VL, num) => {
    return (gastoTotal(dist, VL)/num);
  }

  const fetchConsumoEst = useCallback(async () => {
    const consumoValue = await getConsumoEst('consumo');
    setConsumoEstState(consumoValue);

    const valorLitroValue = await getConsumoEst('valorLitro');
    setValorLitro(valorLitroValue);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchConsumoEst();
    }, [fetchConsumoEst])
  );

  useEffect(() => {
    if (route.params?.update) {
      fetchConsumoEst();
    }
  }, [route.params, fetchConsumoEst]);


  return (
    <View style={s.container}>
      <View style={s.cTitulo2}>
        <View style={s.cArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{ height: 36, width: 36 }} source={require('./assets/voltar.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={s.titulo2}>Calcular gasto</Text>
          <Text style={s.titulo3}>Viagem</Text>
        </View>
      </View>
      <ScrollView style={s.scroll}>
        <View style={[s.opcao]}>
          <Text style={s.txtPadrao}>Calcular volta</Text>
          <Switch
            trackColor={{ false: '#232323', true: '#ebaf17' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('volta')}
            value={switches.volta}
            style={{ marginLeft: 15 }}
          />
        </View>
        <View style={s.opcao}>
          <Text style={s.txtPadrao}>Dividir o valor da viagem</Text>
          <Switch
            trackColor={{ false: '#232323', true: '#ebaf17' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('dividir')}
            value={switches.dividir}
            style={{ marginLeft: 15 }}
          />
        </View>
        {switches.dividir && switches.volta ? (
          <View>
            <Text style={s.titulo4}>
              Número de pessoas na <Text style={s.txtAmarelo}>ida</Text>:
            </Text>
            <TextInput
              style={s.input}
              value={numeroPessoas}
              onChangeText={changeNumeroPessoas}
              keyboardType="numeric"
              placeholder="Digite o nº de pessoas"
              placeholderTextColor="#555555"
            />
            <Text style={s.titulo4}>
              Número de pessoas na <Text style={s.txtAmarelo}>volta</Text>:
            </Text>
            <TextInput
              style={s.input}
              value={numeroPessoasVolta}
              onChangeText={changeNumeroPessoasVolta}
              keyboardType="numeric"
              placeholder="Digite o nº de pessoas"
              placeholderTextColor="#555555"
            />
          </View>
        ) : switches.dividir && !switches.volta ? (
          <View>
            <Text style={s.titulo4}>
              Número de pessoas:
            </Text>
            <TextInput
              style={s.input}
              value={numeroPessoas}
              onChangeText={changeNumeroPessoas}
              keyboardType="numeric"
              placeholder="Digite o nº de pessoas"
              placeholderTextColor="#555555"
            />
        </View>
        ) : (
          <View style={s.coisa}></View>
        )
        }
        <Text style={s.titulo4}>
          Distância da viagem:
        </Text>
        <TextInput
          style={s.input}
          value={distancia}
          onChangeText={changeDistancia}
          keyboardType="numeric"
          placeholder="Digite a distância em km"
          placeholderTextColor="#555555"
        />
        <View style={[s.opcao, {marginBottom: 5}]}>
          <Text style={s.txtPadrao}>Usar valor do litro já salvo?</Text>
          <Switch
            trackColor={{ false: '#232323', true: '#ebaf17' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('litroSalvo')}
            value={switches.litroSalvo}
            style={{ marginLeft: 15 }}
          />
        </View>
        {switches.litroSalvo ? (
          <Text style={[s.txtPadrao,{marginBottom: 10}]}>Valor do litro: <Text style={s.txtPadrao2}>{valorLitro.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text></Text>
        ) : (
          <View>
            <Text style={s.titulo4}>
              Valor do litro abastecido:
            </Text>
            <TextInput
              style={s.input}
              value={valorLitroDig}
              onChangeText={changeValorLitroDig}
              keyboardType="numeric"
              placeholder="Digite o valor do litro em R$"
              placeholderTextColor="#555555"
            />
          </View>
        )}
          <Text style={[s.txtPadrao,{marginBottom: 10}]}>Consumo: <Text style={s.txtPadrao2}>{consumoEst} km/L</Text></Text>
        
        
        
        {check() &&
          <View style={s.resultado1}>
            {switches.litroSalvo ? (
              <View>
                <Text style={s.txtConsumo}>Gasto total:  </Text>
                {switches.dividir ? (
                  <View>
                    {switches.volta ? (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal2(distancia, valorLitro).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto da <Text style={s.txtAmarelo}>ida ou volta</Text>:</Text>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, valorLitro).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto p/ pessoa na <Text style={s.txtAmarelo}>ida</Text>:</Text>
                        <Text style={s.nConsumo}>{divisaoPessoas(distancia, valorLitro, numeroPessoas).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto p/ pessoa na <Text style={s.txtAmarelo}>volta</Text>:</Text>
                        <Text style={s.nConsumo}>{divisaoPessoas(distancia, valorLitro, numeroPessoasVolta).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, valorLitro).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto p/ pessoa: </Text>
                        <Text style={s.nConsumo}>{divisaoPessoas(distancia, valorLitro, numeroPessoas).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    {switches.volta ? (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal2(distancia, valorLitro).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto da <Text style={s.txtAmarelo}>ida ou volta</Text>:</Text>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, valorLitro).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, valorLitro).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text style={s.txtConsumo}>Gasto total:  </Text>
                {switches.dividir ? (
                  <View>
                    {switches.volta ? (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal2(distancia, formatar(valorLitroDig)).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto da <Text style={s.txtAmarelo}>ida ou volta</Text>:</Text>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, formatar(valorLitroDig)).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto p/ pessoa na <Text style={s.txtAmarelo}>ida</Text>:</Text>
                        <Text style={s.nConsumo}>{divisaoPessoas(distancia, formatar(valorLitroDig), numeroPessoas).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto p/ pessoa na <Text style={s.txtAmarelo}>volta</Text>:</Text>
                        <Text style={s.nConsumo}>{divisaoPessoas(distancia, formatar(valorLitroDig), numeroPessoasVolta).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, formatar(valorLitroDig)).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto p/ pessoa: </Text>
                        <Text style={s.nConsumo}>{divisaoPessoas(distancia, formatar(valorLitroDig), numeroPessoas).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    {switches.volta ? (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal2(distancia, formatar(valorLitroDig)).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                        <Text style={[s.txtConsumo, {marginTop: 10}]}>Gasto da <Text style={s.txtAmarelo}>ida ou volta</Text>:</Text>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, formatar(valorLitroDig)).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={s.nConsumo}>{gastoTotal(distancia, formatar(valorLitroDig)).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
          }
        {!check() &&
            <View style={s.resultado2}>
              <Text style={[s.txtConsumo, {fontFamily: 'Poppins_700Bold',}]}>Digite todos os dados</Text>
            </View>
        }
          
      </ScrollView>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold, 
    Poppins_700Bold, 
    Poppins_800ExtraBold, 
    Poppins_900Black,
  })
  if (!fontsLoaded) {
    return null;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="MedUrb" component={MedUrb} />
        <Stack.Screen name="MedEst" component={MedEst} />
        <Stack.Screen name="GastoViagem" component={GastoViagem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#232323',
    height: '100%',
    fontFamily: 'Poppins_500Medium',
  },
  cTitulo:{
    marginLeft: 12,
    marginTop: 40,
    marginBottom: 30,
  },
  cTitulo2:{
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    padding: 0,
    // height: 136,
  },
  consumo: {
    width: '75%',
    borderWidth: 3,
    borderColor: '#ebaf17',
    borderRadius: 20,
    padding: 18,
    marginRight: '5%',
    height: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  resultado1: {
    marginBottom: 20,
    marginTop: 10,
    borderColor: "#EBAF17",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
  },
  resultado2: {
    marginBottom: 20,
    marginTop: 10,
    borderColor: "#EAEAEA",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
  },
  titulo: {
    color: '#EAEAEA',
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 65, 
    fontWeight: '800'
  },
  titulo2: {
    color: '#EAEAEA',
    fontFamily: 'Poppins_700Bold',
    fontSize: 35,
  },
  titulo3: {
    color: '#ebaf17',
    fontSize: 25,
  },
  titulo4: {
    color: '#eaeaea',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 23,
  },
  txtConsumo: {
    color: '#EAEAEA',
    fontSize: 26,
    fontFamily: 'Poppins_500Medium',
  },
  txtBranco: {
    color: "#EAEAEA"
  },
  nConsumo: {
    color: '#ebaf17',
    fontSize: 35,
    fontFamily: 'Poppins_800ExtraBold',
  },
  txtBotao: {
    fontSize: 23,
    fontFamily: 'Poppins_700Bold',
    color: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtNovaMed: {
    fontSize: 17,
  },
  ultimaMed: {
    color: "#EBAF17", 
    fontFamily: 'Poppins_700Bold',
  },
  txtPadrao: {
    color: '#EAEAEA',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  txtPadrao2: {
    color: '#ebaf17',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  txtAmarelo: {
    color: '#EBAF17'
  },
  scroll: {
    flex: 1
  },
  botao: {
    backgroundColor: '#ebaf17',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderRadius: 20,
  },
  botaoDisabled: {
    backgroundColor: '#888888',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderRadius: 20,
  },
  btNovaMed: {
    width: '20%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 116,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  opcao: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between'
  },
  input: {
    color: "#EAEAEA",
    borderColor: "#AAAAAA",
    borderWidth: 2,
    fontSize: 22,
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  cArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  dot: {
    color: '#40b82c',
  },
  dividerTop1: {
    borderTopColor: '#EBAF17',
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 20,
  },
  dividerBottom1: {
    borderBottomColor: '#EBAF17',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  dividerBottom2: {
    borderBottomColor: '#EBAF17',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
});

export default App;
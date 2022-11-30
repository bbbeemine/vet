import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import React,  { useState } from 'react'
import Logo from '../assets/movie1.png'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Register = () => {
  const navigation = useNavigation();
  const [nama,setNama] = useState("");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async (value) => {
    console.log('value', value);

    try {
        const response = await axios.post('http://192.168.131.56:3200/users/Register', {
            nip: value.nip,
            password: value.password,
            nama: value.nama
        })
        if (response.data.status == 200) {
            console.log('response', response.data)
            navigation.navigate('Register')
            AsyncStorage.setItem
            await AsyncStorage.setItem('password', value.password)
            await AsyncStorage.setItem('nip', value.nip)
            await AsyncStorage.setItem('name', value.nama)
        }
    } catch (error) {
        console.log(error.message)
        ToastAndroid.show("Cek kembali nip dan password", ToastAndroid.SHORT)
    }
  }
  

  return (
      <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <View>
              <TextInput
                  style={styles.input}
                  placeholder="Nip"
                  placeholderTextColor="white"
                  onChangeText = {(nip) => setNip(nip)}
                  value = {nip}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="white"
                  onChangeText = {(nama) => setNama(nama)}
                  value = {nama}
              />
              {/* <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="white"
              /> */}
              <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="white"
                  onChangeText = {(password) => setPassword(password)}
                  value = {password}
              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    await handleRegister({ nip,nama, password });
                }}
                  >
                  <Text style={styles.textButton}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Already have an account?
                  <Text
                      style={{ fontWeight: 'bold' }}
                      onPress={() => navigation.goBack()}
                  > Sign in</Text>
              </Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
  },
  logo: {
      width: 150,
      height: 150,
  },
  input: {
      width: 300,
      height: 50,
      backgroundColor: '#333',
      borderRadius: 10,
      color: 'white',
      paddingHorizontal: 20,
      marginBottom: 20,
  },
  button: {
      width: 300,
      height: 50,
      backgroundColor: '#CD853F',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  textButton: {
      color: '#000',
      fontSize: 20,
  },
  text: {
      color: 'white',
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
  },
})

export default Register
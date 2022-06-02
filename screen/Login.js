import React, { Component, useState } from "react";
import {Text,View,  Dimensions,TextInput,  Button,  TouchableOpacity,  StyleSheet,  StatusBar,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
//import { initializeApp } from "firebase/app";
import {auth}  from "../database/firebase";

//import { getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
//import firebase  from "../database/firebase";

const { width, height } = Dimensions.get("window");

const Login = () => {

  const navigation = useNavigation();

  const [loginEmail, setEmail ] = React.useState('')
  const [loginPassword, setPassword ] = React.useState('')
  
  const login = async () =>{
    try {
      
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail,
        loginPassword)
      .then(()=>{
        console.log("Account logged")
        const user = auth.currentUser;
        console.log(user)
        navigation.navigate('Home')
      })
      
    } catch (error) {
      console.log(error.message)
    }
  }
  
  function LoginScreen() {

    const app = initializeAuth()

    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('Home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

    return(
      <View style={styles.mainContainer}>
      <StatusBar style="auto" />
      <View style={styles.containerSVG}>
        <SvgTop />
      </View>
     
      <View style={styles.container}>
  
        <Text style={styles.Title}>Hello</Text>
        <Text style={styles.subTitle}>Sign in to your account</Text>

        <TextInput
          style={styles.textInputStyle}
          placeholder="Ingresa tu correo"
          onChangeText={(text)=>setEmail(text)}

        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Ingresa tu contraseñas"
          secureTextEntry={true}
          onChangeText={(text)=>setPassword(text)}
        />

        
        <View style={styles.boton}>
          <Button  title="Iniciar sesion" onPress={login}></Button>
        </View>
        <View style={styles.boton}>
          <Button style={{marginTop: 20, width:40}} title="Registrarse" onPress={() => navigation.navigate('Registarse')}></Button>
        </View>
        <Text>Ya tienes una cuenta?? </Text>
      </View>
    </View>
    )
  }


  function SvgTop() {
    return (
      <Svg
        width={500}
        height={324}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
          fill="url(#prefix__paint0_linear_103:6)"
          fillOpacity={0.5}
        />
        <Path
          d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
          fill="url(#prefix__paint1_linear_103:6)"
        />
        <Defs>
          <LinearGradient
            id="prefix__paint0_linear_103:6"
            x1={492.715}
            y1={231.205}
            x2={480.057}
            y2={364.215}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FFB677" />
            <Stop offset={1} stopColor="#FF3CBD" />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear_103:6"
            x1={7.304}
            y1={4.155}
            x2={144.016}
            y2={422.041}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FFB677" />
            <Stop offset={1} stopColor="#FF3CBD" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
  return (
    <View style={styles.mainContainer}>
    <StatusBar style="auto" />
    <View style={styles.containerSVG}>
      <SvgTop />
    </View>
   
    <View style={styles.container}>

      <Text style={styles.Title}>Hello</Text>
      <Text style={styles.subTitle}>Sign in to your account</Text>

      <TextInput
        style={styles.textInputStyle}
        placeholder="Ingresa tu correo"
        onChangeText={(text)=>setEmail(text)}

      />
      <TextInput
        style={styles.textInputStyle}
        placeholder="Ingresa tu contraseñas"
        secureTextEntry={true}
        onChangeText={(text)=>setPassword(text)}
      />

      
      <View style={styles.boton}>
        <Button  title="Iniciar sesion" onPress={login}></Button>
      </View>
      <View style={styles.boton}>
        <Button style={{marginTop: 20, width:40}} title="Registrarse" onPress={ () => navigation.navigate('Registro')}></Button>
      </View>
      <Text>Si no tienes cuenta registrate! </Text>
    </View>
  </View>
    
     // <LoginScreen/>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerSVG: {
    width: width,
    height:90,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 40,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  Title: {
    color: "#34434D",
    fontSize: 80,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 30,
    color: "gray",
  },
  boton:{
    padding:12,
    width:200
  }
});

export default Login;

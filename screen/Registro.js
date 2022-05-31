import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import React, { Component, useState } from "react";
import { TouchableOpacity } from "react-native-web";

const Login = ({ navigator }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Crear un cuenta</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Ingresa tu correo"
      />
      <TextInput
        password='true'
        style={styles.textInputStyle}
        placeholder="Ingresa tu contraseña"
      />
              
      <Button title="Registrarse" onPress={()=> navigator.navigate('Login')}></Button>
      <Button title="Iniciar sesión" onPress={()=> navigator.navigate('Login')}></Button>

      <View>
        <Text>Ya tienes una cuenta?? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={{ color: "blue" }}>Login</Text>
        </TouchableOpacity>
      </View>    
    
    </View>
    
    
  );
};

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:15,
    
  },
  textInputStyle: {
   height:40,
   borderColor:'#ccc',
   borderWidth:1,
   alignSelf:'stretch',
   marginBottom:10,
   paddingHorizontal:5
  },
  Title:{
      fontSize:20
  }

  
});

export default Login;

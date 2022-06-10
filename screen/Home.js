import React, { Component, useState } from "react";
import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { View, Text, Button,StyleSheet } from "react-native";
import {db, auth } from "../database/firebase";
import {collection, addDoc, doc, Timestamp} from 'firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () =>{

const [user, setUser] = React.useState()
const [email, setEmail] = React.useState(auth.email)

const [doc, setDoc] = React.useState('')

const navigation = useNavigation();

onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
})

const logout = async() =>{

    await signOut(auth)        
    navigation.navigate('Login')

}
//Agrego productos
const handleAddItem = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',doc,'Items'), {
        cantidad: "1",
        name: "Cerveza negra",
        valor: "2500",
        //created: Timestamp.now()
      })
     
    } catch (err) {
      alert(err)
    }
  }

  //creo lista
const handleCreatedList = async (e) => {
    e.preventDefault()
    try {
      const doc = await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',), {
        
      })
      obtenerIdLista(doc.id)
     // navigation.navigate('Lista')

    } catch (err) {
      alert(err)
    }
  }


  //para prueba
  const datos = () =>{

    obtenerIdLista(doc)

        //navigation.navigate('Lista')

  }

  const obtenerIdLista = async(doc) =>{
    try {
     await AsyncStorage.setItem('@IdLista:lista',doc.toString())
    } catch (error) {
      console.log(error)

    }
  }

    return(
        <View style={styles.container}>
            <Text>
                "Coreo de la sesión :: "
                {user?.email}
            </Text>
            <Text>
                Listado
            </Text>
                <View>
                    <Text>
                        HOLA chau ! ? +
                        {auth.currentUser.uid}

                    </Text>
                </View>
        

                <View>
            
            <Button onPress={(handleCreatedList)} title="Agregar datos"/>
            </View>
            <Text>
                crear
            </Text>
            <View>
            
            <Button onPress={(datos) => navigation.navigate('Lista')} title="Crear lista"/>
            </View>
            
            <Text>
                Salir
            </Text>
            <Button onPress={logout} title="Salir de la sesion"/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#AEE4FF",
        flex: 1,
    }
})


export default Home;
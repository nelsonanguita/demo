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
const [doc, setDoc] = React.useState('')
const [idLista, setidLista] = React.useState('')

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
      //obtenerIdLista(doc.id)
      setidLista(doc.id)
      navigation.navigate('Lista',{idLista :doc.id })

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
                "Coreo de la sesión : "
                {user?.email}
            </Text>
           
               
                <View>
                    <Text>
                        HOLA  {auth.currentUser.email}
                    </Text>
                </View>
        


                        <View>
              <Button style={styles.button} onPress={(handleCreatedList)} title="Crear nueva salida! "/>
            </View>
            
           
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#AEE4FF",
        flex: 1,
    },
    button:{

    }
})


export default Home;
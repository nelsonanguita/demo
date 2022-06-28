import React, { Component, useState } from "react";
import styles from "./Style/styles";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { View, Text,SafeAreaView } from "react-native";
import { auth } from "../database/firebase";
import { async } from "@firebase/util";
//import Lista from './Lista'

const Home = () =>{

const [user, setUser] = React.useState({})
const [doc, setDoc] = React.useState('')
const navigation = useNavigation();

        onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        })


    return(
        <View style={styles.container}>
           
           <SafeAreaView style={styles.safeArea}>
            <View style={styles.contenedorTitulo}>
                <Text style={styles.titulo}>
                        Bienvenido :  {user?.email}
                </Text>
            
            </View>
           </SafeAreaView>

           
            
            
        </View>
    )
}




export default Home;
import React, { Component, useState } from "react";
import styles from "./Style/styles";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { View, Text, TouchableHighlight,Button,StyleSheet,FlatList } from "react-native";
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
           
           <View style={styles.contenedorTitulo}>
            <Text style={styles.titulo}>
                    Bienvenido :  {user?.email}
            </Text>
           
           </View>
            
            
        </View>
    )
}




export default Home;
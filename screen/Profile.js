import React, { Component, useState,useEffect } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import styles from "./Style/styles";

import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../database/firebase";

const Profile = ({navigation}) =>{

    const [user, setUser] = React.useState({})

    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
    })

    
    useEffect(() => {
      
    
      return () => {
        
        return auth
      }
    }, [auth])
    


    const logout = async() =>{

        await signOut(auth)        
        navigation.navigate('Login')
    
    }
    return(
        
           <View style={styles.container}>
            
                <View>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.contenedorTitulo}>
                        <Text style={styles.titulo}>
                                Datos Personales
                        </Text>
                    </View>
                    </SafeAreaView>
             
                </View>
                <Button onPress={logout} title="Salir de la sesion"/>   
        </View>
        
        
    )
}



export default Profile;
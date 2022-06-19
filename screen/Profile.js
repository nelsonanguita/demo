import React, { Component, useState,useEffect } from "react";
import { View, Text, Button } from "react-native";
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
        <View style={{flex:1, backgroundColor:'#AEE4FF'}}>
            <Text>hola estoy en profile</Text>
            <Button onPress={logout} title="Salir de la sesion"/>
        </View>
    )
}


export default Profile;
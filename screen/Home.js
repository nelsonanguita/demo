import React, { Component, useState } from "react";
import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { View, Text, Button } from "react-native";
import { auth } from "../database/firebase";




const Home = () =>{

const [user, setUser] = React.useState()
const [email, setEmail] = React.useState(auth.email)
const navigation = useNavigation();

onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
})

const logout = async() =>{

    await signOut(auth)        
    //navigation.navigate('Login')

}

    return(
        <View>
            <Text>
            "HOMEEEEEEEEEEEEEEEE"
            {user?.email}
            </Text>
            <Text> salir        </Text>
            <Button onPress={logout} title="Salir de la sesion"/>
            
        </View>
    )
}


export default Home;
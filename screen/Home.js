import React, { Component, useState } from "react";
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
           
           
            <Text>
                "Coreo de la sesión : "
                {user?.email}
            </Text>
           
               
                <View>
                    <Text>
                        HOLA  {auth.currentUser.email}
                        HOLA  {auth.currentUser.uid}
                    </Text>
                </View>
        
                <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>

    <View>
              <Button style={styles.button} title="Crear nueva salida! " onPress={ () => navigation.navigate('Lista')} />
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
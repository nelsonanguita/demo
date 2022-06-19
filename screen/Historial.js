import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../database/firebase";

const Historial = ({navigation}) =>{
    return(
        <View style={{flex:1, backgroundColor:'#AEE4FF'}}>
            <Text>hola estoy en historial</Text>
        </View>
    )
}


export default Historial;
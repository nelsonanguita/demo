import React from "react";
import { View, Text, Button } from "react-native";

const Profile = ({navigation}) =>{

    const logout = async() =>{

        await signOut(auth)        
        navigation.navigate('Login')
    
    }
    return(
        <View style={{flex:1, backgroundColor:'#AEE4FF'}}>
            <Text>hola estoy en profile</Text>
            <Text>
                Salir
            </Text>
            <Button onPress={logout} title="Salir de la sesion"/>
        </View>
    )
}


export default Profile;
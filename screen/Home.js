import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./navigation/BottomTab";



const Home = ({navigation}) =>{
    return(

    <NavigationContainer>
        <BottomTab/>
    </NavigationContainer>

    )
}


export default Home;
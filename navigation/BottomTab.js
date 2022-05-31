import React from "react";
import {StyleSheet, Text, View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FaHome, FaUserEdit, FaList } from 'react-icons/fa';
import Profile from '../screen/Profile';
import Home from "../screen/Home";
import Listas from "../screen/Listas";
import Addlist from "../screen/addList";
import listarrer from "../screen/listarrer";
import Login from "../screen/Login";
import Registro from "../screen/Registro";

const Tab = createBottomTabNavigator();

export const BottomTab = () =>{
    return(
            <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                    position:'absolute',
                    bottom:25,
                    left:20,
                    right: 20,
                    elevation: 0,
                    backgroundColor:'#ffffff',
                    borderRadius:15,
                    height: 50,

                }
            }}
            
            >
                <Tab.Screen 
                name="HOME"
                component = {Registro} 
                options={{
                    tabBarIcon:({focused})=>(
                    <View style={{
                        alignItems: 'center',justifyContent:'center',top:0
                    }}>
                        
                        <FaHome style={{ width:18, height:18, color: focused ? '#241B1C': '#B7582A' }}/>
                        <Text>HOME</Text>
                    </View>  
                    )
                    
                }}/>
                <Tab.Screen name="Listas" component = {listarrer} options={{
                    tabBarIcon:({focused})=>(
                    <View style={{
                        alignItems: 'center',justifyContent:'center',top:0
                    }}>
                        <FaList   style={{ width:18, height:18, color: focused ? '#241B1C': '#B7582A' }}/>
                        <Text>LISTAS</Text>
                    </View>  
                    )
                    
                }}/>
                <Tab.Screen name="OPCIONES" component = {Profile} options={{
                    tabBarIcon:({focused})=>(
                    <View style={{
                        alignItems: 'center',justifyContent:'center',top:0
                    }}>
                        <FaUserEdit   style={{ width:18, height:18, color: focused ? '#241B1C': '#241B1C' }}/>
                        <Text>OPCIONES</Text>
                    </View>  
                    )
                    
                }}/>
                <Tab.Screen name="XX" component = {Login} options={{
                    tabBarIcon:({focused})=>(
                    <View style={{
                        alignItems: 'center',justifyContent:'center',top:0
                    }}>
                        <FaUserEdit   style={{ width:18, height:18, color: focused ? '#241B1C': 'green' }}/>
                        <Text>LOGIN</Text>
                    </View>  
                    )
                    
                }}/>
          
                
            </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0'
    },
    colorIcons:{
        width:25,
        height:25,
        color: 'green'
    }
})

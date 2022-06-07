import React, { Component, useState } from "react";
import {StyleSheet, Text, View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screen/Profile';
import Home from "../screen/Home";
import Listas from "../screen/Listas";
//import Addlist from "../screen/addList";
//import listarrer from "../screen/listarrer";
import Historial from "../screen/Historial";
import Login from "../screen/Login";
import Registro from "../screen/Registro";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();

export const BottomTab = () =>{
    const [user, setUser] = React.useState()
    const auth = getAuth();
               onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        })
    return(
                     <Tab.Navigator  initialRouteName="Login"
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                    bottom:25,
                    left:20,
                    right: 20,
                    elevation: 0,
                    backgroundColor:'#ffffff',
                    borderRadius:15,
                    height: 60,
                    width:380

                }
            }} >
                
                {auth.currentUser?.email ?(
                    <Tab.Group>
                        <Tab.Screen
                            name="Home"
                            component = {Home}
                            options={{
                                headerShown: false, //borrar encabezado
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                        //alignItems: 'center',justifyContent:'center',top:0
                                    }}>

                                    <Text>Home</Text>
                                        </View>  
                                        )
                                        
                                    }}/> 
                         <Tab.Screen
                            name="Lista"
                            component = {Listas}
                            options={{
                                headerShown: false, //borrar encabezado
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                       // alignItems: 'center',justifyContent:'center',top:0
                                    }}>

                                    <Text>Listas</Text>
                                        </View>  
                                        )
                                        
                                    }}/>  
                                     <Tab.Screen
                            name="Historial"
                            component = {Historial}
                            options={{
                                headerShown: false, //borrar encabezado
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                      //  alignItems: 'center',justifyContent:'center',top:0
                                    }}>

                                    <Text>Historial</Text>
                                        </View>  
                                        )
                                        
                                    }}/>   
                                     <Tab.Screen
                            name="Perfil"
                            component = {Profile}
                            options={{
                                headerShown: false, //borrar encabezado
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                       // alignItems: 'center',justifyContent:'center',top:0
                                    }}>

                                    <Text>Perfil</Text>
                                        </View>  
                                        )
                                        
                                    }}/>          
                    </Tab.Group>
                    
                ):(
                <Tab.Group>
                    <Tab.Screen 
                    name="Login" component = {Login} 
                        
                        options={{
                            headerShown: false, //borrar encabezado

                            tabBarStyle:{display:'none'},
                        
                            tabBarIcon:({focused})=>(
                            <View style={{
                                alignItems: 'center',justifyContent:'center',top:0
                            }}>
                                
                                
                                <Text>HOME</Text>
                            </View>  
                            )
                        
                    }}/>

                    <Tab.Screen name="Registro" component = {Registro} options={{
                        tabBarStyle:{display:'none'},
                        headerShown: false, //borrar encabezado
                        tabBarIcon:({focused})=>(
                        <View style={{
                            alignItems: 'center',justifyContent:'center',top:0
                        }}>
                            
                            <Text>RESGISTO FUNcIONO</Text>
                        </View>  
                        )
                        
                    }}/>  
                </Tab.Group>    
                )}{

                }

                       
                
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

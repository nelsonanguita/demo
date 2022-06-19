import React, { Component, useState } from "react";
import {StyleSheet, Text, View, Dimensions} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screen/Profile';
import Home from "../screen/Home";
import Lista from "../screen/Lista";
//import Addlist from "../screen/addList";
//import listarrer from "../screen/listarrer";
import Historial from "../screen/Historial";
import Login from "../screen/Login";
import Registro from "../screen/Registro";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

export const BottomTab = () =>{
    const [user, setUser] = React.useState()
    const [idLista, setidLista] = React.useState('xxx')
    
    const auth = getAuth();
               onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        })
    return(
                     <Tab.Navigator  initialRouteName="Login"
            screenOptions={{
                tabBarShowLabel:false,
                tabBarHideOnKeyboard: true,
                tabBarStyle:{
                    bottom:0,
                    backgroundColor:'#FF4000',
                    borderRadius:0,
                    height: 70,
                    width: width,
                           
                }
            }} >
                
                {auth.currentUser?.email ?(
                    <Tab.Group>
                        <Tab.Screen
                            name="Home"
                            component = {Home}
                            initialParams = {{idLista:{idLista}}}
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
                            component = {Lista}
                            options={{
                                //headerShown: false, //borrar encabezado
                                footerShown: false,
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                       // alignItems: 'center',justifyContent:'center',top:0
                                    }}>

                                    <Text>Salidas</Text>
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

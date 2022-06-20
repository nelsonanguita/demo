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

export const BottomTab = (focused) =>{
    const [user, setUser] = React.useState()
    const [idLista, setidLista] = React.useState('xxx')
    
    const auth = getAuth();
               onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        })
    return(
                     <Tab.Navigator  initialRouteName="Login"
            screenOptions={{
               
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor:  '#0077B6',
                tabBarLabelStyle:{
                   //color:'green',
                    height:50,
                    fontSize:20,
                    
                },
                
                tabBarShowLabel:true,
                tabBarHideOnKeyboard: true,
                tabBarStyle:{
                    bottom:0,
                    backgroundColor:'#03045E',
                    borderRadius:0,
                    height: 70,
                    width: width,
                    
                           
                },
                
              
            }} >
                
                {auth.currentUser?.email ?(
                    <Tab.Group>
                        <Tab.Screen
                                                   
                            name= "Home"
                            component = {Home}
                            initialParams = {{idLista:{idLista}}}
                            options={{
                                headerShown: false, //borrar encabezado
                             
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                        //alignItems: 'center',justifyContent:'center',top:0
                                    }}>

                                        </View>  
                                        )
                                        
                                    }}/> 
                         <Tab.Screen
                            name="Salidas"
                            component = {Lista}
                            options={{
                                headerShown: false, //borrar encabezado
                                footerShown: false,
                                
                                tabBarIcon:({focused})=>(
                                    <View style={{
                                       // alignItems: 'center',justifyContent:'center',top:0 
                                    }}>

                                
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
    },


})

import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView,FlatList,TouchableHighlight,StyleSheet } from "react-native";
import {collection, addDoc, getDocs,getDoc,updateDoc, deleteDoc, doc } from 'firebase/firestore'
import {db, auth } from "../database/firebase";

import styles from "./Style/styles";


const Historial = ({navigation}) =>{


 const [listadoHistorial, setListadoHistorial] = useState([]);
    

    
  useEffect(() =>{        
    
     async function ListaT() {
      console.log("Dentro de la funcion ??")
  
      const querySnapshot = await getDocs(collection(db, "Usuario",auth.currentUser.uid,'Salidas'));//,'Items'));
      const listadoItemTemp = []
      
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        //console.log("Se recorrio la lista desde la BD")

         const{ fechaCreacion } = doc.data()
         listadoItemTemp.push({
               id:doc.id,
               fechaCreacion,
    //           name,
    //           valor,
             })
    
    //     //     totalTemp+=(Number(valor)*Number(cantidad))
    setListadoHistorial(listadoItemTemp)

       })      

    }
    
      console.log("Se recorrio la lista desde la BD")
      ListaT()
    
  },[])
 














    return(
        <View style={styles.container}>
            <View >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.contenedorTitulo}>
                        <Text style={styles.titulo}>
                                No hay historial
                        </Text>
                    </View>
                </SafeAreaView>

            </View>

            <View>
                          
            <FlatList                
                  data={listadoHistorial}
                  renderItem={({item}) => //<Text style={styles.item}>{item.name}</Text>
                  <TouchableHighlight
                      key={item.key}
             
                      >
                       
                        <View style={styles2.item}>
                        <Text style={styles2.producto} >{item.id}</Text> 
                         
                                {/* <Pressable
                                      style={({pressed})=>[
                                        {backgroundColor:pressed ? '#FDC297' : '#FC6A03' },
                                        styles.btnEditar
                                      ]}
                                      onPress={() => showModalEditar(item.id)}
                                      >
                                    <Text style={styles.textEditar}>Editar</Text>
                                </Pressable> */}


                        </View>
                  </TouchableHighlight>
                }
            />
            </View>
        </View>
    )
}

const styles2 = StyleSheet.create({
    item: {
      
        padding: 22,
        fontSize: 18,
        height: 80,
        backgroundColor:'white',
        margin:10,
        flexDirection:'row',
        //flex:5,
        alignContent:'center',
        borderRadius:10,
        borderColor:'orange',
        borderWidth:1,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 12
        },
    
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
  
  
        
      },
      producto: {
        fontSize: 20,
        textAlign:'left',
        flex:3,
        marginTop:6,
        color:'#746B6B'
      },
})

export default Historial;
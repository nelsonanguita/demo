import React, {useState} from "react";
import { View, TextInput, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {db, auth } from "../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native-web";
const Lista = ({props}) =>{

const [state, setState] = useState({
    cantidad:'',
    name:'',
    valor:'',
    
})

let list = []
const [doc, setDoc] = React.useState('')
const [modalVisible, setModalVisible] = useState(true);

const handleChangetext=(name, value)=>{
    setState({...state, [name]: value})
}



const handleAddItem = async (e) => {
    e.preventDefault()
    try {

      if (list.length==0) {
        handleCreatedList()
       }
      await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',doc,'Items'), {
        
        cantidad: state.cantidad,
        name: state.name,
        valor: state.valor,
              
        //created: Timestamp.now()
      })
      
    } catch (error) {
      console.log(auth.currentUser.uid+" ERRORRRRRRRRRRRR")
      console.log(error.message)
       // alert(err)
    }
  }

  


  const handleCreatedList = async (e) => {
    e.preventDefault()
    try {
      const doc = await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',), {
      
      })
      
      setDoc(doc.id)
      console.log(doc.id)

     getData()
    } catch (err) {
      alert(err)
  
    }
  }


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@IdLista:lista')
      if(value !== null) {
       console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        console.log(value)
      }
    } catch(e) {
      // error reading value
      console.log(e)

    }
  }

return(
 <View style={styles.container}>
     
     <View style={{flex:1, backgroundColor:'#AEE4FF'}}>
            <Text>LISTADO</Text>
                        
        </View>

        <View>
                <Modal
                style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.casillas}>
            <Text style={{flex:0.5}}>Cantidad</Text>
          <TextInput style={styles.inputText}
            placeholder="ingrese item"
            onChangeText={ (value) => handleChangetext('cantidad',value)}
            />
            </View>
            <View style={styles.casillas}>
            <Text  style={{flex:0.5}}>Producto</Text>
                        <TextInput style={styles.inputText}
            placeholder="ingrese precio"
            onChangeText={ (value) => handleChangetext('name',value)}
            />
            </View>
            <View style={styles.casillas}>
            <Text  style={{flex:0.5}}>Valor</Text>
                        <TextInput style={styles.inputText}
            placeholder="ingrese cant"
            onChangeText={ (value) => handleChangetext('valor',value)}
            />

            </View>
            
            
            

            <View>
                    <Button onPress={handleAddItem} title="Agregar datos"/>
            </View>

            <View>
                    <Button onPress={getData} title="Crear nueva lista"/>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </Pressable>
          </View>
        </View>



      </Modal>
      <View style={styles.botones}>
      <Pressable
          style={[styles.button, styles.buttonOpen,styles.boton]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>CREAR LISTA</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.buttonOpen,styles.boton]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>AGREGAR ITEM</Text>
        </Pressable>

      </View>
      
      <View>
        
      </View>
    </View>
      

 </View>

    )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: "#50B2C0",
    flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      height:300,
      margin: 60,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 12
      },
  
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    inputText:{
      borderColor:'#AEE4FF',
      borderWidth:1,
      width:10,
      height:30,
      margin:15,
      borderRadius:20,
      textAlign:'center',
      flex:0.5

    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      
    },
    buttonOpen: {
      backgroundColor: "#F194FF",

    },
    buttonClose: {
      backgroundColor: "#2196F3",
            
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    casillas:{
      flexDirection: "row",
      alignItems:'center',
      
      
    },
    botones:{
      marginBottom:30
    }
  });
export default Lista;
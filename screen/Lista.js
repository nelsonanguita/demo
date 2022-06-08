import React, {useState} from "react";
import { View, TextInput, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import {db, auth } from "../database/firebase";
import {collection, addDoc, Timestamp} from 'firebase/firestore'


const Lista = ({navigation}) =>{



const [state, setState] = useState({
    cantidad:'',
    name:'',
    valor:'',
    
})
const [doc, setDoc] = React.useState(auth.email)
const [modalVisible, setModalVisible] = useState(false);

const handleChangetext=(name, value)=>{
    setState({...state, [name]: value})
}

const handleAddItem = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',doc,'Items'), {
        
        cantidad: state.cantidad,
        name: state.name,
        valor: state.valor,
        
              
        //created: Timestamp.now()
      })
      
    } catch (err) {
        console.log(state.cantidad)
        console.log(state.name)
        console.log(state.precio)
      alert(err)
    }
  }

  const handleCreatedList = async (e) => {
    e.preventDefault()
    try {
      const doc = await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',), {
      
      })
      
      setDoc(doc.id)
      console.log(setDoc)
    } catch (err) {
      alert(err)
  
    }
  }

return(
 <View>
     
     <View style={{flex:1, backgroundColor:'#AEE4FF'}}>
            <Text>LISTADO</Text>
            <TextInput
            placeholder="ingrese item"
            onChangeText={ (value) => handleChangetext('cantidad',value)}
            />
                        <TextInput
            placeholder="ingrese precio"
            onChangeText={ (value) => handleChangetext('name',value)}
            />
                        <TextInput
            placeholder="ingrese cant"
            onChangeText={ (value) => handleChangetext('valor',value)}
            />


            <View>
                    <Button onPress={handleAddItem} title="Agregar datos"/>
            </View>

            <View>
                    <Button onPress={handleCreatedList} title="Crear nueva lista"/>
            </View>

            
        </View>

        <View>
                <Modal
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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
      

 </View>

    )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
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
    }
  });
export default Lista;
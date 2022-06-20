import React, {useEffect ,useState} from "react";
import { View,FlatList,TouchableHighlight, TextInput, Text, Modal, StyleSheet, Pressable, Alert } from "react-native";
import {collection, addDoc, getDocs,getDoc,updateDoc, deleteDoc, doc } from 'firebase/firestore'
import {db, auth } from "../database/firebase";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from "@firebase/util";
import { BottomTabBar } from "@react-navigation/bottom-tabs";



const Lista = () =>{

  const [listadoItem, setListadoItem] = useState([]);
  const [idLista, setidLista] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState(false);
  const [idItem, setIdItem ]= useState('');
  const [total, setTotal] = useState('');




  useEffect(() =>{        
    
   
    
    async function ListaT() {
      console.log("Dentro de la funcion")
  
      const querySnapshot = await getDocs(collection(db, "Usuario",auth.currentUser.uid,'Salidas',idLista,'Items'));
      const listadoItemTemp = []
      let totalTemp=0
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const{ cantidad, name, valor} = doc.data()
        listadoItemTemp.push({
              id:doc.id,
              cantidad,
              name,
              valor,
            })
    
            totalTemp+=(Number(valor)*Number(cantidad))
  
      })      
      setTotal(totalTemp)
      setListadoItem(listadoItemTemp)  
     
    }
        
    if (idLista!=='') {
      console.log("Se recorrio la lista desde la BD")
      ListaT()
    }
  },[idItem])
 

  async function buscarElementos() {
    console.log("Dentro de la funcion")

    const querySnapshot = await getDocs(collection(db, "Usuario",auth.currentUser.uid,'Salidas',idLista,'Items'));
    const listadoItem = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      const{ cantidad, name, valor} = doc.data()
          listadoItem.push({
            id:doc.id,
            cantidad,
            name,
            valor,
          })
  
         // console.log(listadoItem)

    })      
   // console.log(listadoItem+"desde el effect")
    console.log("Se recorrio la lista desde la BD")
    setListadoItem(listadoItem)

   //return () => null;
  }

//UPDATE ITEMS
const [state, setState] = useState({
    cantidad:'',
    name:'',
    valor:'',
    
})


//EDITAR ELEMENTOS
const handleEditItem = async (idItem) => {
console.log("actualiza? "+ idItem)
 try {
  const docRef = doc(db,('Usuario/'+auth.currentUser.uid+'/Salidas/'+idLista+'/Items/'),idItem)
   
    await updateDoc(docRef ,{
      cantidad: state.cantidad,
      name: state.name,
      valor: state.valor,
    })
    setState({...state, 
      'name': '',
      'valor': '',
      'cantidad': '',
      'id': ''
    })
    setIdItem(docRef.id)

    setModalVisibleEditar(false);
   // buscarElementos()
 } catch (error) {
  console.log(error.message)
 }

}



//ELIMINAR ELEMENTO
const handleDeleteItem = async (idItem) => {
  try {
  
   const docRef = doc(db,('Usuario/'+auth.currentUser.uid+'/Salidas/'+idLista+'/Items/'),idItem)
   deleteDoc(docRef).then({

  })
 
  setIdItem(docRef.id)
  setState({...state, 
    'name': '',
    'valor': '',
    'cantidad': '',
    'id': ''
  })
  setModalVisibleEditar(false);
  
  } catch (error) {
    console.log(error.message)
    console.log("error.message")

  }
   
}


//OPTENGO DATOS DESDE LO INPUT
const handleChangetext=(name, value)=>{
    setState({...state, [name]: value})
}

//MODAL

const showModalEditar = (idItem) =>{

  let item = listadoItem.find(item => item.id === idItem)
 
  setState({...state, 
    'name': item.name,
    'valor': item.valor,
    'cantidad': item.cantidad,
    'id': item.id
  })

    setModalVisibleEditar(true);

}

//AGREGAR ITEM 
const handleAddItem = async (e) => {
   // e.preventDefault()
    try {
     console.log("agrego item")
     const docRef = await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',idLista,'Items'), {
                
        cantidad: state.cantidad,
        name: state.name,
        valor: state.valor,
              
        //created: Timestamp.now()
      })
      setIdItem(docRef.id)
     // buscarElementos()
      setModalVisible(false)
      console.log("agrego item exitoso")
        state.cantidad =''
        state.name=''
        state.valor=''
    } catch (error) {
      if (idLista=='') {
        Alert.alert("Debe crear una lista para agregar elemetos")
      }
      console.log(idLista+ " ERRORRRRRRRRRRRR")
      console.log(error.message)
    }
  }

//CREAR LISTA
  const handleCreatedList = async () => {
     console.log("creo lista")
     
    //e.preventDefault()
    try {
      if (idLista!=='') {
        console.log('ya hay una lista en uso\nDesea crear otra?')
        return null
      }
      const doc = await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',), {
       })
     
      console.log(doc.id)
      setidLista(doc.id)
      setModalVisible(true)
    } catch (err) {
      console.log("erro lista"+err.message)
      alert(err.message)
      console.log(doc.id)
  
    }
  }


return(
 <View style={styles.container}>

          <View style={styles.contenedorTitulo}>
              <Text style={styles.titulo}>
                      LLevamos un total de: $ {total}.-   
              </Text>
          </View>
  
         <View style={styles.titulos}>
            <Text style={styles.tituloNombre1}>PRODUCTO</Text>
            <Text style={styles.tituloNombre2}>PRECIO</Text>
            <Text style={styles.tituloNombre3}>CANTIDAD</Text>
            <Text style={styles.tituloNombre4}></Text>

          </View>
    

    
          
            <FlatList                
                  data={listadoItem}
                  renderItem={({item}) => //<Text style={styles.item}>{item.name}</Text>
                  <TouchableHighlight
                      key={item.key}
                      >
                       
                        <View style={styles.item}>

                              <Text style={styles.producto}>{item.name}</Text> 
                              <Text style={styles.precio}>{'$ '+item.valor}</Text> 
                              <Text style={styles.cantidad}>{item.cantidad}</Text> 
                                <Pressable
                                      style={styles.btnEditar}
                                      onPress={() => showModalEditar(item.id)}
                                      >
                                    <Text style={styles.textEditar}>Editar</Text>
                                </Pressable>


                        </View>
                  </TouchableHighlight>
                }
            />

            <View style={styles.botones}>



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

<Pressable
                        style={styles.btnCerrar}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Cerrar</Text>
                  </Pressable>
                  
                  <View style={styles.centeredView}>


                
                    <View style={styles.modalView}>
            


                      <View style={styles.casillas}>
                        <Text style={{flex:0.5}}>Cantidad</Text>
                          <TextInput style={styles.inputText}
                            value={state.cantidad}
                            placeholder="ingrese item"
                            onChangeText={ (value) => handleChangetext('cantidad',value)}
                            />
                      </View>
                      <View style={styles.casillas}>
                          <Text  style={{flex:0.5}}>Producto</Text>
                            <TextInput   style={styles.inputText}
                            value={state.name}
                          placeholder="ingrese precio"
                          onChangeText={ (value) => handleChangetext('name',value)}
                          />
                      </View>
                      <View style={styles.casillas}>
                          <Text  style={{flex:0.5}}>Valor</Text>
                              <TextInput style={styles.inputText}
                              value={state.valor}
                          placeholder="ingrese cant"
                          onChangeText={ (value) => handleChangetext('valor',value)}
                          />

                      </View>
                      
                      <View style={styles.btnModal}>
                        
                     
                        <Pressable
                          style={styles.botonesModalAceptar}
                          onPress={() => handleAddItem()}
                        >
                          <Text style={styles.textStyle}>AGREGAR</Text>
                        </Pressable>
                   

                      </View>
                    
          
                    </View>
                  </View>
                        
                

                </Modal>
            </View>

            <View>
                <Modal 
                    style={styles.modal}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleEditar}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisibleEditar(!modalVisibleEditar);
                    }}
                >

                  <Pressable
                        style={styles.btnCerrar}
                        onPress={() => setModalVisibleEditar(!modalVisibleEditar)}
                      >
                        <Text style={styles.textStyle}>Cerrar</Text>
                  </Pressable>
                  
                  <View style={styles.centeredView}>


                
                    <View style={styles.modalView}>
            


                      <View style={styles.casillas}>
                        <Text style={{flex:0.5}}>Cantidad</Text>
                          <TextInput style={styles.inputText}
                            value={state.cantidad}
                            placeholder="CAMBIAR CANTIDAD"
                            onChangeText={ (value) => handleChangetext('cantidad',value)}
                            />
                      </View>
                      <View style={styles.casillas}>
                          <Text  style={{flex:0.5}}>Producto</Text>
                            <TextInput   style={styles.inputText}
                            value={state.name}
                          placeholder="CAMBIAR NOMBRE"
                          onChangeText={ (value) => handleChangetext('name',value)}
                          />
                      </View>
                      <View style={styles.casillas}>
                          <Text  style={{flex:0.5}}>Valor</Text>
                              <TextInput style={styles.inputText}
                              value={state.valor}
                          placeholder="CAMBIAR PRECIO"
                          onChangeText={ (value) => handleChangetext('valor',value)}
                          />

                      </View>
                      
                      <View style={styles.btnModal}>
                        
                      <Pressable
                          style={styles.botonesModalEliminar}
                          onPress={()=>handleDeleteItem(state.id)}
                        >
                          <Text style={styles.textStyle}>ELIMINAR</Text>
                        </Pressable>

                        <Pressable
                          style={styles.botonesModalAceptar}
                          onPress={() => handleEditItem(state.id)}
                        >
                          <Text style={styles.textStyle}>ACEPTAR</Text>
                        </Pressable>
                   

                      </View>
                    
          
                    </View>
                  </View>
                        
                

                </Modal>
            </View>
         
         
          </View>
          <View style={styles.contenedorbotonesAgregar}>
                      <Pressable
                        style={styles.buttonAgregar}
                        onPress={() => handleCreatedList()}
                                  >
                          <Text visible={false} style={styles.textStyle}>CREAR LISTA</Text>
                      </Pressable>
                      
                      <Pressable
                        style={styles.buttonAgregar}
                        onPress={() => setModalVisible(true)}
                      >
                          <Text style={styles.textStyle}>AGREGAR ITEM</Text>
                      </Pressable>



          </View>
 </View>

    )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: "#AEE4FF",
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
    buttonAgregar: {
      borderRadius: 15,
      padding: 6,
      //elevation: 10,
      width:100,
      backgroundColor: "#000066",
      color: "white",
      height:54,
      marginRight:10,
      
      
    },
    btnEditar:{
      borderRadius: 17,
      padding: 10,
      width:70,
      backgroundColor: "#000066",
      color: "white",
      height:40,
      
      
    },
    contenedorbotonesAgregar:{
      height:60,
      //alignItems:'center',
      flexDirection: "row",
      alignSelf:'center',
      alignItems:'center'

      
    },  
    buttonClose: {
      backgroundColor: "#2196F3",
      color: "white",
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
      //alignItems:'stretch',
    
      
      
    },
    botones:{
      
      marginBottom:30,
      alignSelf:'flex-end',
      marginTop:400,
      position:'absolute'

    },
    item: {
      padding: 22,
      fontSize: 18,
      height: 80,
      backgroundColor:'white',
      margin:10,
      flexDirection:'row',
      //flex:5,
      alignContent:'center',
      borderRadius:10
    },
    producto: {
      fontSize: 20,
      textAlign:'left',
      flex:3,
      marginTop:6
  
    },
    precio: {
      fontSize: 20,
      textAlign:'center',
      marginRight:15,
      flex:2,
      marginTop:5,
      borderWidth:1,
      borderColor:'#AEE4FF',
      borderRadius:10  
        
    },
    cantidad: {
      fontSize: 20,
      flex:1,
      
      marginTop:5,
      textAlign:'center',
      marginRight:10,
      borderWidth:1,
      borderColor:'#AEE4FF',
      borderRadius:10  
    },
    titulos:{
      flexDirection:'row',
      backgroundColor:'#000066',
      text: 'white',
      height:25,
      alignItems:'center'
    },
    tituloNombre1:{
      fontSize: 15,
      flex:2.2,
      marginLeft:15,
      color: "white",
    },
    tituloNombre2:{
      fontSize: 15,
      flex:1,
      color: "white",
      marginLeft:-40
    },
    tituloNombre3:{
      fontSize: 15,
      flex:1,
      color: "white",
    },
    tituloNombre4:{
      fontSize: 15,
      flex:1,
      
    },
    textEditar:{
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      height:20
    },
    btnModal:{
      flexDirection:'row',
      
    },
    botonesModalAceptar:{
      height:30,
      width:80,
      backgroundColor:'green',
      borderRadius:15,
      marginRight:10,
      padding:6

    },
    botonesModalEliminar:{
      height:30,
      width:80,
      backgroundColor:'red',
      borderRadius:15,
      marginLeft:10,
      padding:6

    },
    btnCerrar:{
      backgroundColor: 'red',
      padding:6,
      color: "white",
      fontWeight: "bold",
      height:60,
      width:60,
      borderRadius:15,
      marginBottom:-280,
      marginLeft:290,
      marginTop:120,
      elevation:7
      
    },
    contenedorTitulo:{
      height:60,
      backgroundColor:'#0077B6',
      flexDirection: "row",
      alignItems:'center',
  },
  titulo:{
      color:'white',
      fontSize:20,
      textAlign:'center',
      
  }
  });
export default Lista;
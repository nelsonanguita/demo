import React, {useEffect ,useState} from "react";
import { View,FlatList,TouchableHighlight, TextInput, Text, Modal, StyleSheet, Pressable, Alert, SafeAreaView } from "react-native";
import styles2 from "./Style/styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {collection, addDoc, getDocs,getDoc,updateDoc, deleteDoc, doc } from 'firebase/firestore'
import {db, auth } from "../database/firebase";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from "@firebase/util";
import { BottomTabBar } from "@react-navigation/bottom-tabs";


const Lista = () =>{

  const [listadoItem, setListadoItem] = useState([]);
  const [idLista, setidLista] = useState(''); 
  const [idItem, setIdItem ] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState(false);

  const [total, setTotal] = useState('0');




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
              valor:currencyFormat(parseInt(valor))
            })
    
            totalTemp+=(Number(valor)*Number(cantidad))
  
      })      

    
      setTotal(currencyFormat(totalTemp))
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
    //const listadoItem = []
    const listadoItemTemp = []
    let totalTemp=0

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      const{ cantidad, name, valor} = doc.data()
      listadoItemTemp.push({
            id:doc.id,
            cantidad,
            name,
            valor:currencyFormat(parseInt(valor))
          })
          totalTemp+=(Number(valor)*Number(cantidad))
          

    })      
    setTotal(currencyFormat(totalTemp))
      console.log("Se recorrio la lista desde la BD")
    setListadoItem(listadoItemTemp)

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
    });

    //setIdItem('')
   
    setState({...state, 
      'name': '',
      'valor': '',
      'cantidad': '',
      'id': ''
      })
    
    //console.log(idItem+"        aqui")
    
    setModalVisibleEditar(false);
    
    buscarElementos()
 } catch (error) {
  console.log(error.message)
 }

}



//ELIMINAR ELEMENTO
const handleDeleteItem = async (idItem) => {
  try {
  
   const docRef =  doc(db,('Usuario/'+auth.currentUser.uid+'/Salidas/'+idLista+'/Items/'),idItem)
   deleteDoc(docRef).then(
    function (){
      buscarElementos()

          setState({...state, 
            'name': '',
            'valor': '',
            'cantidad': '',
            'id': ''
          })
          setModalVisibleEditar(false);
     //     setIdItem('')
          console.log('borro?')
    }  

  )

  
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
    'valor': item.valor.replace(/[&/\#,+()$~%.'":*?<>{}]/g, ''),
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
        //console.log('ya hay una lista en uso\nDesea crear otra?')
        return null
      }
      const doc = await addDoc(collection(db, 'Usuario',auth.currentUser.uid,'Salidas',), {
       })
     
      console.log(doc.id)
      setidLista(doc.id)
      setModalVisible(true)
    } catch (err) {
      console.log("error lista"+err.message)
      alert(err.message)
      console.log(doc.id)
  
    }
  }

  

   function currencyFormat(num) {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
 }

return(
 <View style={styles.container}>
        <SafeAreaView style={styles2.safeArea}>
            <View style={styles.contenedorTitulo}>
                <Text style={styles.titulo}>
                        LLevamos un total de: {total}.-   
                </Text>
 
            </View>
          </SafeAreaView>  
         
         <View style={styles.titulos}>
            <Text style={styles.tituloNombre1}>PRODUCTO</Text>
            <Text style={styles.tituloNombre2}>CANTIDAD</Text>
            <Text style={styles.tituloNombre3}>PRECIO</Text>
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
                              <Text style={styles.cantidad}>{item.cantidad}</Text> 
                              <Text style={styles.precio}>{item.valor}</Text> 
                              
                                <Pressable
                                      //style={styles.btnEditar}
                                      style={({pressed})=>[
                                        {backgroundColor:pressed ? '#FDC297' : '#FC6A03' },
                                        styles.btnEditar
                                      ]}
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
                      //style={styles.modal}
                      animationType="slide"
                      transparent
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}
                  >
                    
                    <View style={styles.centeredView}>


                    <KeyboardAwareScrollView>
                      <View style={styles.modalView}>
                          
                          <View style={styles.headerModal}>
                              <Pressable
                                  style={({pressed})=>[
                                        {backgroundColor:pressed ? '#c49b9b' : '#FF0000' },
                                          styles.btnCerrar ]}   
                                    onPress={() => setModalVisible(!modalVisible)}
                                  >
                                    <Text style={styles.textStyle}>Cerrar</Text>
                              </Pressable>
                          </View>

                      
                        <View style={styles.casillas}>
                            <Text  style={styles.casillasTexto}>PRODUCTO</Text>
                              <TextInput   style={styles.inputText}
                              value={state.name}
                            placeholder=""
                            onChangeText={ (value) => handleChangetext('name',value)}
                            />
                        </View>
                       
                        <View style={styles.casillas}>
                            <Text  style={styles.casillasTexto}>VALOR</Text>
                                <TextInput style={styles.inputText}
                                value={state.valor}
                            placeholder=""
                            onChangeText={ (value) => handleChangetext('valor',value)}
                            />

                        </View>
                        <View style={styles.casillas}>
                          <Text style={styles.casillasTexto}>CANTIDAD</Text>
                            <TextInput style={styles.inputText}
                              value={state.cantidad}
                              placeholder=""
                              onChangeText={ (value) => handleChangetext('cantidad',value)}
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

                      </KeyboardAwareScrollView>
                    </View>
                          
                  

                  </Modal>
              </View>




            <View>
                <Modal 
                    //style={styles.modal}
                    animationType="slide"
                    transparent
                    visible={modalVisibleEditar}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisibleEditar(!modalVisibleEditar);
                    }}
                >


                  
                  <View style={styles.centeredView}>


                  <KeyboardAwareScrollView>

                    <View style={styles.modalView}>
            
                        <View style={styles.headerModal}>
                            <Pressable
                                style={({pressed})=>[
                                      {backgroundColor:pressed ? '#c49b9b' : '#FF0000' },
                                        styles.btnCerrar ]}   
                                  onPress={() => setModalVisibleEditar(!modalVisibleEditar)}
                                >
                                  <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        </View>


                      <View style={styles.casillas}>
                          <Text  style={styles.casillasTexto}>PRODUCTO</Text>
                            <TextInput   style={styles.inputText}
                            value={state.name}
                          placeholder=""
                          onChangeText={ (value) => handleChangetext('name',value)}
                          />
                      </View>
                      <View style={styles.casillas}>
                          <Text  style={styles.casillasTexto}>VALOR</Text>
                              <TextInput style={styles.inputText}
                              value={state.valor}
                          placeholder=""
                          onChangeText={ (value) => handleChangetext('valor',value)}
                          />

                      </View>
                      <View style={styles.casillas}>
                        <Text style={styles.casillasTexto}>CANTIDAD</Text>
                          <TextInput style={styles.inputText}
                            value={state.cantidad}
                            placeholder=""
                            onChangeText={ (value) => handleChangetext('cantidad',value)}
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
                    </KeyboardAwareScrollView>

                  </View>
                        
                

                </Modal>
            </View>
         
         
          </View>
          <View style={styles.contenedorbotonesAgregar}>
                      <Pressable
                        
                        style={({pressed})=>[
                          {backgroundColor:pressed ? '#FDC297' : '#FC6A03' },
                          styles.buttonAgregar
                        ]}   
                        onPress={() => handleCreatedList()}
                                  >
                          <Text style={styles.textStyle}>CREAR LISTA</Text>
                      </Pressable>
                      
                      <Pressable
                        //style={styles.buttonAgregar}
                        style={({pressed})=>[
                          {backgroundColor:pressed ? '#FDC297' : '#FC6A03' },
                          styles.buttonAgregar
                        ]}
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
  // backgroundColor: "black",
    backgroundColor:'#161a1d',
    flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
     // alignItems: "center",
      marginTop: 22
    },
    modalView: {
      height:300,
      margin: 60,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
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
      borderColor:'orange',
      borderWidth:1,
      width:10,
      height:30,
      margin:15,
      borderRadius:20,
      textAlign:'center',
      flex:0.5,
      fontSize:20,
      color:'#746B6B',


    },
    btnCerrar:{
     // backgroundColor: 'red',
     // padding:6,
      color: "white",
      fontWeight: "bold",
      height:50,
      width:60,
      borderRadius:15,
      marginEnd:-30,
      marginTop:-40,
      justifyContent:'center'
      //marginBottom:-180,
      //marginLeft:290,
      //marginTop:120,
     // elevation:7
      
    },
    buttonAgregar: {
      borderRadius: 15,
      padding: 6,
      //elevation: 10,
      width:100,
      //backgroundColor: "#000066",
      color: "white",
      height:54,
      marginRight:10,
      
      
    },
    btnEditar:{
      borderRadius: 17,
      padding: 10,
      width:70,
     // backgroundColor: "#000066",

      color: "white",
      height:40,
      
      
    },
    contenedorbotonesAgregar:{
      height:60,
      //alignItems:'center',
      flexDirection: "row",
     // alignSelf:'center',
      alignItems:'center',
      justifyContent:'space-between',
      
      
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
      alignItems:'center',
      padding:-10,
      marginLeft:10
      
      
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
      marginTop:5,
      color:'#746B6B',
      marginLeft:-10,
      
    },
    precio: {
      padding:5,
      fontSize: 15,
      textAlign:'center',
      marginRight:15,
      flex:2,
      marginTop:5,
      borderWidth:1,
      borderColor:'orange',
      borderRadius:10,
      color:'#746B6B',

    },
    cantidad: {
      fontSize: 15,
      flex:1,
      padding:5,
      marginTop:5,
      textAlign:'center',
      marginRight:10,
      borderWidth:1,
      borderColor:'orange',
      borderRadius:10,
      color:'#746B6B'

    },
    titulos:{
      flexDirection:'row',
      //backgroundColor:'#000066',
      text: 'white',
      height:25,
      alignItems:'center',
      //marginTop:5,
      backgroundColor:'#FC6A03',
      borderTopWidth:2,
      borderColor:'white',
      height:35

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
      marginLeft:-100
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
      justifyContent:'space-between',
      
      
    },
    botonesModalAceptar:{
      height:40,
      width:80,
      backgroundColor:'green',
      borderRadius:10,
      justifyContent:'center',
      marginTop:20
    },
    botonesModalEliminar:{
      height:40,
      width:80,
      backgroundColor:'red',
      borderRadius:10,
      justifyContent:'center',
      marginRight:40,
      marginTop:20
    },

    contenedorTitulo:{
      height:60,
      //backgroundColor:'#0077B6',
     backgroundColor:'#FC6A03',
      flexDirection: "row",
      alignItems:'center',
      
  },
  titulo:{
      color:'white',
      fontSize:20,
      textAlign:'center',
      marginLeft:15

  },
  headerModal:{
    width:'100%',
    height:40,
    alignItems:'flex-end',
    justifyContent:'center',
    
  },
  casillasTexto:{
    flex:0.5,
    color:'#746B6B',
    fontSize:18
  }
  
  });
export default Lista;
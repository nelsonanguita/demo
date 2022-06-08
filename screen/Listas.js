import React, { useState }from 'react';
import {Dimensions,Pressable,SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TextInput, Modal} from 'react-native';
const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Cerveza',
    price: '$3500',
    cant: '3',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Piscola',
    price: '$3000',
    cant: '44',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pizza',
    price: '$8500',
    cant: '1',
  },
];



const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const editItem = () =>{

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
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  

  const renderItem = ({ item }) => 
    //<Item title={item.title+" "+ item.price+" "+ item.cant} />
<View>
    
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
              <Text style={styles.modalText}>Eliminar o Editar</Text>
              
              <TextInput style={styles.modalTextInput}>Cerveza</TextInput>
              <TextInput style={styles.modalTextInput}>$2800</TextInput>
              <TextInput style={styles.modalTextInput}>2</TextInput>

                <View style={styles.botones}>
                  
              <Pressable
                style={[styles.button, styles.buttonCloseEliminar]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <Text style={styles.textStyleEliminar}>ELIMINAR</Text>
              </Pressable>



              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyleGuardar}>GUARDAR</Text>
              </Pressable>
                </View>


            </View>
          </View>
        </Modal>
        </View>
        <View style={styles.item}>
            <Text style={styles.producto}>{item.title}</Text> 
            <Text style={styles.precio}>{item.price}</Text> 
            <Text style={styles.cantidad}>{item.cant}</Text> 
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
                >
              <Text style={styles.textStyle}>Editar</Text>
          </Pressable>
        </View>


        
</View>
    ;

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
        <FlatList 
          data={DATA} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} />
          
        </View>
        <Pressable
                style={[styles.buttonAgregar, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
                >
              <Text style={styles.textStyle}>+</Text>
          </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#AEE4FF',

  },
  item: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    borderRadius:20
  },
  producto: {
    fontSize: 20,
    textAlign:'left',
    flex:3,
    marginTop:5

  },
  precio: {
    fontSize: 20,
    textAlign:'center',
    marginRight:1,
    flex:2,
    marginTop:5    
  },
  cantidad: {
    fontSize: 20,
    flex:1,
    textAlign:'center',
    marginTop:5
  },

  container2:{
      marginTop:50
  },
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
    backgroundColor: "#6A9CFD",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonCloseEliminar: {
    backgroundColor: "#D0312D",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyleEliminar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyleGuardar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextInput:{
    marginBottom: 15,
    textAlign: "center",
    borderWidth:2,
    borderColor:"#AEE4FF",
    borderRadius:3,
    width:100,


  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    borderColor: "#ccc",
  },
  botones:{
    flexDirection: "row",
    
  },
  buttonAgregar:{
    padding:15,
    width:50,
    alignSelf:'flex-end',
    borderRadius:50
    }
 
});

export default App;

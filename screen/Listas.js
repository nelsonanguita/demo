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
              
              <TextInput style={styles.modalText}>Cerveza</TextInput>
              <TextInput style={styles.modalText}>$2800</TextInput>
              <TextInput style={styles.modalText}>2</TextInput>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>ACEPTAR</Text>
              </Pressable>
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

export default App;

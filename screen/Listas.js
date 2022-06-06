import React from 'react';
import {Dimensions, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TextInput } from 'react-native';
const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Cervezqwqwqwqwa',
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
const App = () => {

  const renderItem = ({ item }) => 
    //<Item title={item.title+" "+ item.price+" "+ item.cant} />
    <View style={styles.item}>
        <Text style={styles.producto}>{item.title}</Text> 
        <Text style={styles.precio}>{item.price}</Text> 
        <Text style={styles.cantidad}>{item.cant}</Text> 
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
    fontSize: 15,
    flex:1 ,
    textAlign:'left',
    //width:50,
    flex:3

  },
  precio: {
    fontSize: 20,
    flex:1,
    textAlign:'center',
    marginRight:1,
    flex:2,
    
  },
  cantidad: {
    fontSize: 20,
    flex:1,
    textAlign:'center',
    //width:10,
    flex:1
  },

  container2:{
      marginTop:50
  },
 
});

export default App;

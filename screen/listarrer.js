import React from 'react';
import { FlatList, StyleSheet, Text, View , Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {

    const datos = [
        {key: 'Devin', name:'holas',valor:"3445"},
        {key: 'Dan', name:'chao',valor:"3445"},
        {key: 'Dominic', name:'quepasa',valor:"3445"},
        {key: 'Dowqwqminic', name:'aqui',valor:"3445"},

      ]
    const renderItem = ({item} ) => {
            return(
              <Text style={styles.item}>
             
                {item.name} - 
                {item.valor}
                <Button title='+' onPress={() => addItem('hola','aqui','estoy')}></Button> - 
                <Button title='-'></Button> - 
                <Button title='borrar'></Button>
              </Text>
            )
    }
            
            
    
   const addItem = ({key, name, valor}) => {
 
        datos.push({
            key:"agregado1",
            name:"confirmo",
             valor:"690"
        })
        return renderItem
        
    }
  return (
    <View style={styles.container}>
      <FlatList
        data={
            datos
        }
        renderItem={
            renderItem
        }
            
      />
    </View>
  );
}

export default FlatListBasics;
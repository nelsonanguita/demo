import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native-web";
import firebase  from "../database/firebase";

const addList = () => {
 
 
    const saveList = async() => {
        if (state.name!='') {
            await  firebase.db.collection('Usuario')
            .doc('ID_usuario')
            .collection('Salidas')
            .doc('Consumo')
            .collection('Items').add({
                name: state.name,
                valor: state.valor,
                cantidad: state.cantidad
            })
        } else {
            alert("No hay datos")
        }
  };

  const [state, setState] = useState({
    name: "",
    valor: "",
    cantidad: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });

};
  return (
    <View style={{ flex: 1, padding: 35 }}>
      <Text>NOMBRE DE LA LISTA </Text>
      <TextInput
        placeholder="Producto"
        onChangeText={(value) => handleChangeText("name", value)}
      />
      <TextInput
        placeholder="Valor"
        onChangeText={(value) => handleChangeText("valor", value)}
      />
      <TextInput
        placeholder="Cantidad"
        onChangeText={(value) => handleChangeText("cantidad", value)}
      />

      <Button title="Aceptar" onPress={() => saveList()}></Button>
    </View>
  );
};

export default addList;

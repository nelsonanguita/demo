import React from "react";
import { View, Text } from "react-native";
import styles from "./Style/styles";

import { auth } from "../database/firebase";

const Historial = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.contenedorTitulo}>
                    <Text style={styles.titulo}>
                            No hay historial
                    </Text>
                </View>
            </View>
        </View>
    )
}



export default Historial;
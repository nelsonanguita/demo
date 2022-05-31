import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./navigation/BottomTab";

const App = () => {
  return(
    <NavigationContainer>
      <BottomTab/>
    </NavigationContainer>
  );
} 



export default App;
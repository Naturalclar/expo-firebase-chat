// App.js
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./src/navigations/AuthStack";
import { MainStack } from "./src/navigations/MainStack";
import { auth } from "./firebase";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // ログイン中
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  });

  return (
    <NavigationContainer>
      {loggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

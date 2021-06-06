import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ChatScreen } from "../screens/ChatScreen";

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

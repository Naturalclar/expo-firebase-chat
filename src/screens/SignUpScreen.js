import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Title, TextInput, Button } from "react-native-paper";
import { auth } from "../../firebase";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  paddingLarge: {
    padding: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
  paddingSm: {
    padding: 8,
  },
});

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  /**
   * アカウントを登録する
   */
  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Register Success!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.flex}>
      <View style={[styles.flex, styles.paddingLarge]}>
        <Title style={styles.marginBottom}>新規登録</Title>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.marginBottom}
        ></TextInput>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.marginBottom}
        ></TextInput>
        <Button
          mode="contained"
          style={[styles.paddingSm, styles.marginBottom]}
          onPress={signup}
        >
          新規登録
        </Button>
        <Button
          style={[styles.paddingSm, styles.marginBottom]}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          既存アカウントにログインする
        </Button>
      </View>
    </SafeAreaView>
  );
};

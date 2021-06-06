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

export const LoginScreen = () => {
  const navigation = useNavigation();

  /**
   * ログインする
   */
  const signin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Signin Success!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <SafeAreaView style={styles.flex}>
      <View style={[styles.flex, styles.paddingLarge]}>
        <Title style={styles.marginBottom}>ログイン</Title>
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
          onPress={signin}
        >
          ログイン
        </Button>
        <Button
          style={[styles.paddingSm, styles.marginBottom]}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          アカウントを作成する
        </Button>
      </View>
    </SafeAreaView>
  );
};

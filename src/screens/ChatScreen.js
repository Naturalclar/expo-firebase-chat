// src/screens/ChatScreen.js
import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-paper";
import { auth, db } from "../../firebase";

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export const ChatScreen = () => {
  const navigation = useNavigation();
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign out success!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={signOut}>ログアウト</Button>,
    });
  }, []);

  // 表示するチャットメッセージの配列
  const [messages, setMessages] = React.useState([]);

  React.useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          placeholder="メッセージを入力してください..."
          onSend={onSend}
          user={{
            _id: auth?.currentUser?.email,
          }}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </View>
    </SafeAreaView>
  );
};

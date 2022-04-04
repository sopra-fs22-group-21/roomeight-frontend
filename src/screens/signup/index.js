import React, { useState, createRef } from "react";
import styles from "./style";
import en from "../../resources/strings/en.json";
import { View, ScrollView } from "react-native";
import { TextBlock, Heading, Title } from "../../components/theme";
import { Input } from "../../components/input";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [errortext, setErrortext] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Heading>{en.signup.welcome}</Heading>
        <Title>{en.signup.title}</Title>
        <TextBlock>{en.signup.enterDetails}</TextBlock>
        <Input label={en.signup.email} />
      </ScrollView>
    </View>
  );
};
export default Signup;

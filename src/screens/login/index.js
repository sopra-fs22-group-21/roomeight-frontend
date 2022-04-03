import React, {useState} from "react";
import { View, Button } from "react-native";
import styles from "./style";
import en from "../../resources/strings/en.json";
import {TextBlock, Heading, Title, Box } from '../../components/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Input } from '../../components/input';
import { PrimaryButton } from '../../components/button';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Heading>{en.signup.welcome}</Heading>
      <Title>{en.signup.title}</Title>
      <KeyboardAwareScrollView
        style={styles.inner}
        showsVerticalScrollIndicator={false}
      >
        <TextBlock>{en.signup.enterDetails}</TextBlock>
        <Input
          label={en.signup.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          label={en.signup.password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <PrimaryButton onPress={() => alert("Success")}>Log In</PrimaryButton>
        <Button title="Don't have an account yet" />
      </KeyboardAwareScrollView>
    </View>
  );
};
export default Login;
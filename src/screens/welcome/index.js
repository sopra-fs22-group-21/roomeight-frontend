import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";
import en from "../../resources/strings/en.json";
import Room8Logo from "../../../assets/logo/Room8Logo.js";
import {TextBlock, Title } from "../../components/theme";
import Signup from "../signup";
import Route from "../../navigation/main";


function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Room8Logo/>
      </View>
      <TextBlock>{en.welcome.message}</TextBlock>

      <TouchableOpacity
        style={styles.providerButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Title>{en.welcome.signup}</Title>
      </TouchableOpacity>

      <Title>{en.welcome.or}</Title>

      <TouchableOpacity
        style={styles.providerButton}
        onPress={() => navigation.navigate("Login")}
        >
        <Title>{en.welcome.login}</Title>
      </TouchableOpacity>
    </View>
  );
}
export default Welcome;

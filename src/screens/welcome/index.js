import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";
import en from "../../resources/strings/en.json";
import Room8Logo from "../../../assets/logo/Room8Logo.js";
import {Heading, Title } from "../../components/theme";
import Signup from "../signup";
import Route from "../../navigation/main";


function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Room8Logo />
      </View>
      <Title>{en.welcome.message}</Title>

      <TouchableOpacity
        style={styles.providerButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Heading>{en.welcome.signup}</Heading>
      </TouchableOpacity>

      <Heading>{en.welcome.or}</Heading>

      {/* <TouchableOpacity>
        style={styles.providerButton}
        onPress={() => navigation.navigate("Login")} */}
        <Heading>{en.welcome.login}</Heading>
      {/* </TouchableOpacity> */}
    </View>
  );
}
export default Welcome;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import Room8Logo from "../../../../../assets/logo/room8.svg";

export default function AuthenticationMenu({ authPage, setAuthPage }) {
  return (
    <View style={styles.container}>
      <View>
        <Room8Logo width={193} fill="#000" />
      </View>

      <View style={styles.containerMain}>
        <Text style={styles.headerText}>
          {authPage == 0 ? "log in" : "sign up"}
        </Text>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={styles.providerButtonText}>Sign Up with Email</Text>
          <View />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.containerBottomButton}
        onPress={() => (authPage == 0 ? setAuthPage(1) : setAuthPage(0))}
      >
        {authPage == 0 ? (
          <Text>
            Don't have an account?{" "}
            <Text style={styles.bottomButtonText}>Sign up</Text>
          </Text>
        ) : (
          <Text>
            Already have an account?{" "}
            <Text style={styles.bottomButtonText}>Log In</Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

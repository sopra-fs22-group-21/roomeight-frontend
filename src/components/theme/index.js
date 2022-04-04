import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export const Heading = (props) => (
  <View style={styles.textBox}>
    <Text style={{ ...styles.heading, ...props.style }}>{props.children}</Text>
  </View>
);

export const Title = (props) => (
  <View style={styles.textBox}>
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  </View>
);

export const TextBlock = (props) => (
  <View style={styles.textBox}>
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  </View>
);

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

export const Heading = (props) => {
    return props.hidden ? (
        <Box />
    ) : (
        <Box>
            <Text style={{ ...styles.heading, ...props.style }}>
                {props.children}
            </Text>
        </Box>
    );
};

export const SmallHeading = (props) => (
    <Text style={{ ...styles.smallHeading, ...props.style }}>
        {props.children}
    </Text>
);

export const Title = (props) => (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

export const TextBlock = (props) => (
    <Box>
        <NormalText style={{ ...props.style }}>{props.children}</NormalText>
    </Box>
);

export const Strong = (props) => (
    <Text style={{ ...styles.label, ...props.style }}>{props.children}</Text>
);

export const NormalText = (props) => (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
);

export const Box = (props) => (
    <View style={{ ...styles.textBox, ...props.style }}>{props.children}</View>
);

export const SemiBold = (props) => (
    <Text style={{ ...styles.semiBold, ...props.style }}>{props.children}</Text>
);

export const Padding = (props) => (
    <View style={{ ...styles.padding, ...props.style }}>{props.children}</View>
);

export const Inner = (props) => (
    <View style={styles.inner} {...props}>
        {props.children}
    </View>
);

export const ScreenPadding = (props) => (
    <View {...props} style={{ ...styles.screenPadding, ...props.style }}>
        {props.children}
    </View>
);

export const SmallHeadingWithBack = (props) => (
    <View style={styles.row}>
        <Icon
            name="arrow-back"
            size={30}
            style={styles.icon}
            onPress={() => props.navigation.goBack()}
        />
        <Pressable onPress={props.onPress}>
            <SmallHeading>{props.children}</SmallHeading>
        </Pressable>
    </View>
);

export const Name = (props) => (
    <Box>
        <Text style={{ ...styles.name, ...props.style }}>{props.children}</Text>
    </Box>
);

export const PinkBackground = (props) => {
    if (props.onPress) {
        return (
            <Pressable
                onPress={props.onPress}
                style={{ ...styles.pink, ...props.style }}
            >
                {props.children}
            </Pressable>
        );
    } else {
        return (
            <View style={{ ...styles.pink, ...props.style }}>
                {props.children}
            </View>
        );
    }
};

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { SecondaryButton } from '../button';
import NavBar from '../navbar';
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
    <Text style={{ ...styles.title, ...props.style }}>
        {props.children}
    </Text>
);

export const TextBlock = (props) => (
    <Box>
        <NormalText style={{...props.style }}>{props.children}</NormalText>
    </Box>
);

export const NormalText = (props) => (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
)

export const Box = (props) => (
    <View style={{ ...styles.textBox, ...props.style }}>{props.children}</View>
);

export const SemiBold = (props) => (
    <Text style={{ ...styles.semiBold, ...props.style }}>{props.children}</Text>
);

export const Padding = (props) => (
    <View style={{ ...styles.padding, ...props.style }}>{props.children}</View>
);

export const Container = (props) => {
    const dispatch = useDispatch();
    return (
        <View {...props} style={{ ...styles.container, ...props.style }}>
            {props.children}
            {props.showLogout ? (
                <SecondaryButton onPress={() => dispatch(logoutUser())}>
                    Logout
                </SecondaryButton>
            ) : null}
            {props.showNavBar ? <NavBar navigation={props.navigation} /> : null}
        </View>
    );
};
export const Inner = (props) => (
    <View style={styles.inner} {...props}>
        {props.children}
    </View>
);

export const Screen = (props) => {
    return (
        <View style={{ ...styles.screen, ...props.style }} {...props}>
            {props.children}
            {props.showFooter ? <NavBar navigation={props.navigation} /> : null}
        </View>
    );
};

export const Name = (props) => (
    <Box>
        <Text style={{ ...styles.name, ...props.style }}>{props.children}</Text>
    </Box>
);

export const PinkBackground = (props) => (
    <Pressable {...props} style={styles.pink}>
        {props.children}
    </Pressable>
);
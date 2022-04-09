import React from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './style';
import { logoutUser } from '../../redux/actions/logoutUser';

export const Container = (props) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.container} {...props}>
            {props.children}
            {props.showLogout ? (
                <Button title="Logout" onPress={() => dispatch(logoutUser())} />
            ) : null}
        </View>
    );
};
export const Inner = (props) => (
    <View style={styles.inner} {...props}>
        {props.children}
    </View>
);

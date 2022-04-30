import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../button';
import { Container, Heading, TextBlock, Title, Box } from '../theme';
import en from '../../resources/strings/en.json';
import styles from './styles';
import { View } from 'react-native';

const AddFlatInProfile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <PrimaryButton  onPress={() => navigation.navigate('RoomInfo')} 
            >
                Create a flat
            </PrimaryButton>
        </View>
    );
};
export default AddFlatInProfile;

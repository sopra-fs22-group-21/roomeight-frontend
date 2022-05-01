import React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../button';
import styles from './styles';

const AddFlatInProfile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <PrimaryButton onPress={() => navigation.navigate('CreateFlat')}>
                Create a flat
            </PrimaryButton>
        </View>
    );
};
export default AddFlatInProfile;

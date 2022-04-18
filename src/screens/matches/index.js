import React, { useState } from 'react';
import { Text } from 'react-native';
import NavBar from '../../components/navbar';
import { Container, Screen } from '../../components/theme';

const Matches = ({ navigation }) => {
    return (
        <Screen navigation={navigation} showFooter>
        <Container>
            <Text>Matches</Text>
        </Container>
        </Screen>
    );
};
export default Matches;

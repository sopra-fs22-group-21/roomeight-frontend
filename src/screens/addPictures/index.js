import React, { useState } from 'react';
import { View, Button } from 'react-native';
import en from '../../resources/strings/en.json';
import {
    TextBlock,
    Heading,
    Title,
    Container,
    Inner,
} from '../../components/theme';
import { SecondaryButton } from '../../components/button';

const AddPictures = ({ navigation }) => {
    return (
        <Container>
            <Heading>{en.addPictures.heading}</Heading>
            <Inner>
                <SecondaryButton>{en.chooseStatus.room}</SecondaryButton>
                <SecondaryButton>{en.chooseStatus.roommate}</SecondaryButton>
                <SecondaryButton>{en.chooseStatus.flat}</SecondaryButton>
            </Inner>
        </Container>
    );
};
export default AddPictures;

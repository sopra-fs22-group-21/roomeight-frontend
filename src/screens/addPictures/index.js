import React, { useState } from 'react';
import { View, Button } from 'react-native';
import en from '../../resources/strings/en.json';
import { TextBlock, Heading, Title } from '../../components/theme';
import { SecondaryButton } from '../../components/button';
import { Container, Inner } from '../../components/basic';

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

import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { Pressable, View } from 'react-native';
import { Box } from '../theme';

const NavItem = ({ navigation }) => (
    <View>
        <Pressable onPress={() => navigation.navigate('Discover')}>
            <Icon name="search" size={20} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profile')}>
            <Icon name="heart" size={20} color="black" />
        </Pressable>
    </View>
);

const NavBar = ({ navigation }, props) => (
    <View>
        <NavItem navigation={navigation} />
    </View>
);
export default NavBar;

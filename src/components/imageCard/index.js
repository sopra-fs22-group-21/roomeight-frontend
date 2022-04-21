import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, TouchableOpacity} from 'react-native';
import { Box, NormalText, PinkBackground, TextBlock, Title } from '../theme'
import { ProfilePicture } from '../profilePicture';
import en from '../../resources/strings/en.json';
import styles from './styles';
import Tags from '../tags';
import tags from '../../resources/strings/tags';
import tagIcons from '../../resources/icons/tagIcons';
import { InputBox, InputLabel } from '../input';
import Swiper from "react-native-web-swiper";

export const ImageCard = (props) => {
    const { userprofile } = useSelector(state => state.userprofileState)
    return (
        <PinkBackground >
            <Box/>
                    <TouchableOpacity onPress={props.onPress} >
                        <Title style={styles.name}>{userprofile.firstName}</Title>
                    </TouchableOpacity>
                <View style={styles.swiper}>
                <Swiper
                    from={1}
                    minDistanceForAction={0.1}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '',
                      prevTitle: '',
                    }}
                  >
                      <ProfilePicture image={userprofile.pictureReference[0]} style={styles.image}/>
                      <ProfilePicture image={userprofile.pictureReference[1]} style={styles.image}/>
                      <ProfilePicture image={userprofile.pictureReference[0]} style={styles.image}/>
                  </Swiper>
                </View>
                
        </PinkBackground>
    );
};

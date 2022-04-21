import { React, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { SingleDetailCard } from '../../components/singleDetailCard';
import { LikeButton, LikeButtons } from '../../components/likeButtons';
import { ProfilePicture } from '../../components/profilePicture';
import {
    Box,
    Container,
    Heading,
    Screen,
    SmallHeading,
} from '../../components/theme';
import styles from './styles';
import { ImageCard } from '../../components/imageCard';

const Discover = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [isShowingDetails, setIsShowingDetails] = useState(true);
    return (
        <Screen navigation={navigation} showFooter>
            <Container style={styles.container}>
                <SmallHeading>Discover</SmallHeading>
                <Box />
                {isShowingDetails ? (
                    <SingleDetailCard
                        onPress={() => setIsShowingDetails(false)}
                    />
                ) : (
                    <ImageCard onPress={() => setIsShowingDetails(true)} />
                )}

                <Box />
                <LikeButtons />
            </Container>
        </Screen>
    );
};
export default Discover;

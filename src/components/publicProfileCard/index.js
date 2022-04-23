import { React, useState } from 'react';
import { ImageCard } from '../imageCard';
import { FlatDetailCard } from '../flatDetailCard';
import { SingleDetailCard } from '../singleDetailCard';
import { View } from 'react-native-animatable';
import styles from './styles';
import { Title } from '../theme';

export const PublicProfileCard = (props) => {
    const [isShowingImage, setIsShowingImage] = useState(props.isFlat);

    return (
        <>
            {isShowingImage ? (
                <ImageCard
                    profile={props.profile}
                    onPress={() => setIsShowingImage(false)}
                    onDoubleTap={props.onDoubleTap}
                />
            ) : props.isFlat ? (
                <FlatDetailCard
                    flatprofile={props.profile}
                    onPress={() => setIsShowingImage(true)}
                    onDoubleTap={props.onDoubleTap}
                />
            ) : (
                <SingleDetailCard
                    userprofile={props.profile}
                    onPress={() => setIsShowingImage(true)}
                    textIfNoData={props.textIfNoData}
                    onDoubleTap={props.onDoubleTap}
                />
            )}
        </>
    );
};

export const EmptyCard = (props) => (
    <View style={styles.textIfNoData}>
        <Title>{props.textIfNoData}</Title>
    </View>
);

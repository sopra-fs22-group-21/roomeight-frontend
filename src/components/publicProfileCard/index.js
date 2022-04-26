import { React, useState } from 'react';
import { ImageCard } from '../imageCard';
import { FlatDetailCard } from '../flatDetailCard';
import { SingleDetailCard } from '../singleDetailCard';
import { View } from 'react-native-animatable';
import styles from './styles';
import { Title } from '../theme';

export const PublicProfileCard = (props) => {
    const [isShowingImage, setIsShowingImage] = useState(
        props.profile.isFlat && !props.showDetailsFirst
    );

    return (
        <>
            {isShowingImage ? (
                <ImageCard
                    profile={props.profile}
                    onPress={() => setIsShowingImage(false)}
                    onDoubleTap={props.onDoubleTap}
                    onClickMessage={props.onClickMessage}
                />
            ) : props.profile.isFlat ? (
                <FlatDetailCard
                    flatprofile={props.profile}
                    onPress={() => setIsShowingImage(true)}
                    onClickMessage={props.onClickMessage}
                    onDoubleTap={props.onDoubleTap}
                    onClickEdit={props.onClickEdit}
                />
            ) : (
                <SingleDetailCard
                    userprofile={props.profile}
                    onPress={() => setIsShowingImage(true)}
                    onDoubleTap={props.onDoubleTap}
                    onClickMessage={props.onClickMessage}
                    onClickEdit={props.onClickEdit}
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

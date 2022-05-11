import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Profiles } from '../profiles';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';
import { Box } from '../theme';

const LikesList = (props) => {
    const flatprofile = props.flatprofile;
    console.log(flatprofile);
    return (
        <View>
            <View style={styles.horizontal}>
                <Icon name="like" type="foundation" size={24} color={'black'} />
                <FlatList
                    numColumns={5}
                    data={Object.values(flatprofile.likes)}
                    renderItem={({ item }) => {
                        return item ? (
                            <ProfilePicture
                                profile={item}
                                id={item.profileId}
                                key={item.profileId}
                                style={styles.profilePicture}
                                /* initials={item.initials}
                                image={
                                    item.pictureReferences
                                        ? item.pictureReferences[0]
                                        : 0 }*/
                            ></ProfilePicture>
                        ) : null;
                    }}
                />
            </View>
            <Box />
            <View>
                <Pressable style={styles.horizontal}>
                    <Icon
                        name="dislike"
                        type="foundation"
                        size={24}
                        color={'black'}
                    />
                    <ProfilePicture
                        style={styles.profilePicture}
                        initials={props.initials}
                    ></ProfilePicture>
                </Pressable>
            </View>
        </View>
    );
};
export default LikesList;

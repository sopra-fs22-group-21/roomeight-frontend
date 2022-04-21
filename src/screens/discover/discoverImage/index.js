import { React } from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { ImageCard } from '../../../components/imageCard';
import DiscoverBase from '../discoverBase';

const DiscoverImage = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    return (
        <DiscoverBase
            navigation={navigation}
            userprofile={userprofile}
            onPressImage={() => navigation.navigate('DiscoverDetail')}
            isImage
        />
    );
};

export default DiscoverImage;

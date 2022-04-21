import { React } from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { SingleDetailCard } from '../../../components/singleDetailCard';
import DiscoverBase from '../discoverBase';

const DiscoverDetail = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    return (
        <DiscoverBase
            navigation={navigation}
            userprofile={userprofile}
            onPressDetail={() => navigation.navigate('DiscoverImage')}
        />
    );
};

export default DiscoverDetail;

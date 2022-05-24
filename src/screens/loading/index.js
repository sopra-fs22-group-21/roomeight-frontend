import React from 'react';
import M8Loader from '../../../assets/logo/M8Loader';
import { ScreenContainer } from '../../components/screenContainer';

const Loading = ({ navigation }) => {
    return (
        <ScreenContainer>
            <M8Loader />
        </ScreenContainer>
    );
};
export default Loading;

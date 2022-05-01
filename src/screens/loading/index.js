import React from 'react';
import { Inner } from '../../components/theme';
import M8Loader from '../../../assets/logo/M8Loader';
import { ScreenContainer } from '../../components/screenContainer';

const Loading = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Inner style={{ paddingTop: '70%' }}>
                <M8Loader />
            </Inner>
        </ScreenContainer>
    );
};
export default Loading;

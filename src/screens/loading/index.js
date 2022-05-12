import React from 'react';
import M8Loader from '../../../assets/logo/M8Loader';
import { ScreenContainer } from '../../components/screenContainer';
import { Inner } from '../../components/theme';

const Loading = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Inner
                style={{
                    paddingTop: '70%',
                    height: '100%',
                    paddingBottom: '100%',
                }}
            >
                <M8Loader />
            </Inner>
        </ScreenContainer>
    );
};
export default Loading;

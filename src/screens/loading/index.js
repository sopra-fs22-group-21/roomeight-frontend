import { Container } from 'native-base';
import React from 'react';
import { Inner } from '../../components/theme';
import M8Loader from '../../../assets/logo/M8Loader';

const Loading = ({ navigation }) => {
    return (
        <Inner>
            <M8Loader />
        </Inner>
    );
};
export default Loading;

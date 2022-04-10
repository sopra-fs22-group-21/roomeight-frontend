import React from 'react';
import { Box } from '../theme';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import styles from './style';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

export const Gender = (props) => (
    <Box>
        <View>
            <FemaleIcon />
        </View>
    </Box>
);

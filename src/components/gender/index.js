import React from 'react';
import { Box } from '../theme';
import styles from './style';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { InputBox } from '../input';

export const Gender = (props) => (
    <InputBox style={styles.box}>
        <View style={styles.rowcontainer}>
        <TouchableOpacity>
            <Icon 
            name={'venus'} 
            type={'font-awesome'}
            size={50} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon 
            name={'mars'} 
            type={'font-awesome'}
            size={50}
            style={styles.male} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon 
            name={'transgender-alt'} 
            type={'font-awesome'}
            size={50} />
        </TouchableOpacity>
        </View>
    </InputBox>
);

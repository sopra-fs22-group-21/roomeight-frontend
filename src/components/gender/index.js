import React from 'react';
import { Box } from '../theme';
import styles from './style';
import { Pressable, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { InputBox } from '../input';
import { GenderButton } from '../button';

export const Gender = (props) => (
    //const [genderSelected, setgenderSelected] = useState("female");
    <InputBox style={styles.box}>
        <View style={styles.rowcontainer}>
            <GenderButton>
                <Icon name={'venus'} type={'font-awesome'} size={40} />
            </GenderButton>
            <GenderButton>
                <Icon
                    name={'mars'}
                    type={'font-awesome'}
                    size={40}
                    style={styles.male}
                />
            </GenderButton>
            <GenderButton>
                <Icon
                    name={'transgender-alt'}
                    type={'font-awesome'}
                    size={40}
                />
            </GenderButton>
        </View>
    </InputBox>
);

import { React, useState } from 'react';
import { Box } from '../theme';
import styles from './style';
import { Pressable, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { InputBox } from '../input';
import { GenderButton } from '../button';
import { Tab, TabView } from 'react-native-elements/dist/tab/Tab';
import genders from '../../resources/strings/genders';

const Gender = (props) => {
    const [index, setIndex] = useState(0);
    const [gender, setGender] = useState(genders.notSet);
    const genderOptions = [genders.female, genders.male, genders.others];
    return (
        <Tab
            value={index}
            onChange={(e) => {
                setIndex(e);
                setGender(genderOptions[e]);
                props.onChange(genderOptions[e]);
            }}
            indicatorStyle={styles.indicator}
            variant="primary"
        >
            <Tab.Item
                containerStyle={styles.tab}
                icon={{
                    name: 'venus',
                    type: 'font-awesome',
                    color: 'black',
                    size: 30,
                }}
            />
            <Tab.Item
                containerStyle={styles.tab}
                icon={{
                    name: 'mars',
                    type: 'font-awesome',
                    color: 'black',
                    size: 30,
                }}
            />
            <Tab.Item
                containerStyle={styles.tab}
                icon={{
                    name: 'transgender-alt',
                    type: 'font-awesome',
                    color: 'black',
                    size: 30,
                }}
            />
        </Tab>
    );
};
export default Gender;

import { React, useState } from 'react';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import genders from '../../resources/strings/genders';
import styles from './styles';

const Gender = (props) => {
    const [gender, setGender] = useState(genders.notSet);
    const genderOptions = [genders.female, genders.male, genders.others];
    const i = genderOptions.indexOf(props.defaultValue);
    const [index, setIndex] = useState(
        genderOptions.indexOf(props.defaultValue)
    );
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

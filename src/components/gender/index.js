import { React, useState } from 'react';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import genders from '../../resources/strings/genders';
import styles from './styles';

const femaleIcon = {
    name: 'venus',
    type: 'font-awesome',
    color: 'black',
    size: 30,
};

const maleIcon = {
    name: 'mars',
    type: 'font-awesome',
    color: 'black',
    size: 30,
};

const otherIcon = {
    name: 'transgender-alt',
    type: 'font-awesome',
    color: 'black',
    size: 30,
};

export const GenderInput = (props) => {
    const [gender, setGender] = useState(genders.notSet);
    const genderOptions = [genders.female, genders.male, genders.others];
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
            <Tab.Item containerStyle={styles.tab} icon={femaleIcon} />
            <Tab.Item containerStyle={styles.tab} icon={maleIcon} />
            <Tab.Item containerStyle={styles.tab} icon={otherIcon} />
        </Tab>
    );
};

export const Gender = (props) => {
    let icon;
    switch (props.gender) {
        case genders.female:
            icon = femaleIcon;
            break;
        case genders.male:
            icon = maleIcon;
            break;
        case genders.others:
            icon = otherIcon;
            break;
        default:
            return null;
    }
    return <Icon {...icon} size={props.size} style={props.style} />;
};

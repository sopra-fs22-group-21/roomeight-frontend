import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './style'
import en from './resources/strings/en.json';

const Signup = props => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [phone, setPhone] = useState(null);


    return (
        <View style={styles.containerMain}>
            <Text>en.signup.welcome</Text>
        </View>
    )
}



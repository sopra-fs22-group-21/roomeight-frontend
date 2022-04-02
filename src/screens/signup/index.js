import React, {useState} from 'react';
import styles from './style'
import en from '../../resources/strings/en.json';
import { View, ScrollView, Button } from 'react-native';
import { TextBlock, Heading, Title, Box } from '../../components/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Input } from '../../components/input';
//import DateInput from '../../components/dateInput';
//<DateInput label={en.signup.birthday} onChange={(date) => setBirthday(date)}/>

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [errortext, setErrortext] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  return (
      <View style={styles.container}>
        <Heading>{en.signup.welcome}</Heading>
        <Title>{en.signup.title}</Title>
        <KeyboardAwareScrollView style={styles.inner} showsVerticalScrollIndicator={false}>
          <TextBlock>{en.signup.enterDetails}</TextBlock>
          <Input label={en.signup.email}  keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => setEmail(text)}/>
          <Input label={en.signup.password}  secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
          <Box/>
          <Input label={en.signup.firstname}  autoCapitalize="words" onChangeText={(text) => setFirstName(text)}/>
          <Input label={en.signup.lastname}  autoCapitalize="words" onChangeText={(text) => setLastName(text)}/>
          <Button title="Sign up"/>
          <Button title="Already have an account"/>
        </KeyboardAwareScrollView>
      </View>
  )
}
export default Signup;
import React, {useState} from 'react';
import styles from './style'
import en from '../../resources/strings/en.json';
import { View, ScrollView, KeyboardAwareScrollView } from 'react-native';
import { TextBlock, Heading, Title, Box, Button } from '../../components/theme';
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
    <View>
      <KeyboardAwareScrollView style={styles.container}>
        <Heading>{en.signup.welcome}</Heading>
        <Title>{en.signup.title}</Title>
        <ScrollView style={styles.inner} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          <TextBlock>{en.signup.enterDetails}</TextBlock>
          <Input label={en.signup.email}  keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => setEmail(text)}/>
          <Input label={en.signup.password}  secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
          <Box/>
          <Input label={en.signup.firstname}  autoCapitalize="words" onChangeText={(text) => setFirstName(text)}/>
          <Input label={en.signup.lastname}  autoCapitalize="words" onChangeText={(text) => setLastName(text)}/>
          <Button>Register</Button>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}
export default Signup;
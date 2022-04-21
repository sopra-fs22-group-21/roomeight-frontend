import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Container, Screen } from '../../components/theme';
import { useDispatch } from 'react-redux';
import { chatInfoListener, chatMessagesListener } from '../../redux/actions/chatActions';

const Matches = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, []);


    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Text>Matches</Text>
            </Container>
        </Screen>
    );
};
export default Matches;

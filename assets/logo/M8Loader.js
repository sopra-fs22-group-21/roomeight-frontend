import { View } from 'react-native';
import { Image } from 'react-native';

const M8Loader = (props) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', height: '100%'}}>
        <Image
            source={require('./M8Loader40.gif')}
            style={{
                height: props.height ? props.height : 200,
                width: props.width ? props.width : 200,
                alignSelf: 'center',
            }}
        />
        </View>
    );
};

export default M8Loader;

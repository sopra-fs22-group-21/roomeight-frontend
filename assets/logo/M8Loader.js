import { View, Image } from 'react-native';

const M8Loader = (props) => {
    return (
        <View style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image
                source={require('./m8Loader30.gif')}
                style={{
                    height: props.height,
                    width: props.width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </View>
    );
};

export default M8Loader;

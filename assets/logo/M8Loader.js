import { Image } from 'react-native';

const M8Loader = (props) => {
    return (
        <Image
            source={require('./M8Loader40.gif')}
            style={{
                height: props.height ? props.height : 200,
                width: props.width ? props.width : 200,
                alignSelf: 'center',
            }}
        />
    );
};

export default M8Loader;

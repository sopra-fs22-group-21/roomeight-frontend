import { Image } from 'react-native';
import { ScreenContainer } from '../../src/components/screenContainer';

const M8Loader = (props) => {
    return (
        <Image
            source={require('./M8Logo')}
            style={{
                height: props.height ? props.height : 200,
                width: props.width ? props.width : 200,
                alignSelf: 'center',
            }}
        />
    );
};

export default M8Loader;

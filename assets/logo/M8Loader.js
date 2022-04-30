import { Image } from 'react-native';
import { ScreenContainer } from '../../src/components/screenContainer';

const M8Loader = (props) => {
    return (
        <ScreenContainer>
            <Image
                source={require('./m8Loader30.gif')}
                style={{
                    height: props.height,
                    width: props.width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
       </ScreenContainer>
    );
};

export default M8Loader;

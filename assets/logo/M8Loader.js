import { Image } from 'react-native';
import { Container } from '../../src/components/theme';

const M8Loader = (props) => {
    return (
        <Container>
            <Image
                source={require('./m8Loader30.gif')}
                style={{
                    height: props.height,
                    width: props.width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </Container>
    );
};

export default M8Loader;

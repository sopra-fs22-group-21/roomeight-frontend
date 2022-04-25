import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import tagIcons from '../../resources/icons/tagIcons';
import {
    Container,
    Name,
    Screen,
    Heading,
    Title,
    Box,
} from '../../components/theme';
import PictureInput from '../../components/pictureInput';
import { logoutUser } from '../../redux/actions/authActions';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputBox, InputLabel, Input } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import DateInput from '../../components/dateInput';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { PickImage } from '../../helper/imageHandler';
import { updateUserprofile } from '../../redux/actions/updateUserprofile';
import { SingleDetailCard } from '../../components/singleDetailCard';
import dateFormat from 'dateformat';

const SingleProfile = (props) => {
    useEffect(() => {
        console.log('render');
    }, []);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loadingState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [image, setImage] = useState(userprofile.pictureReference[0]);
    const [moveInDateValid, setmoveInDateValid] = useState(
        userprofile.moveInDate
    );
    const [user, setUser] = useState(null);
    let selectedTagsSingle = [];

    const [editMode, setEditMode] = useState(false);

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userprofile);
    }
    if (editMode) {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={styles.inner}
                    behavior="padding"
                >
                    <View>
                        <DateInput
                            label={en.completeSingleProfile.moveInDate}
                            valid={moveInDateValid}
                            defaultValue={userprofile.moveInDate}
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        moveInDate: date,
                                    });
                                setmoveInDateValid(valid && date > new Date());
                            }}
                        />

                        <InputBox label={'Tags'}>
                            <Tags
                                preSelected={userprofile.tags}
                                onChange={(tags) => console.log(tags)}
                            />
                        </InputBox>
                        <Input
                            label={en.completePersonalProfile.biography}
                            defaultValue={userprofile.biography}
                            multiline
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    biography: text,
                                })
                            }
                        />
                        <Input
                            label={en.completePersonalProfile.description}
                            defaultValue={userprofile.description}
                            multiline
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    description: text,
                                })
                            }
                        />
                    </View>
                    <PrimaryButton
                        onPress={() => {
                            setEditMode(false);
                            dispatch(updateUserprofile(user));
                            console.log('putting');
                            console.log(userprofile);
                        }}
                    >
                        Save
                    </PrimaryButton>
                </KeyboardAwareScrollView>
            </View>
        );
    } else {
        return (
            <SingleDetailCard
                userprofile={userprofile}
                onClickEdit={() => setEditMode(true)}
            />
        );
    }
};
export default SingleProfile;

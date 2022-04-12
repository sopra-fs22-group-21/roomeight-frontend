import en from '../../resources/strings/en.json';
import { Select } from 'native-base';

const Dropdown = () => {
    return (
        <Center>
            <FormControl w="3/4" maxW="300" isRequired isInvalid>
                <FormControl.Label>
                    {en.completeFlatProfile.nrRoommates}
                </FormControl.Label>
                <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                >
                    <Select.Item label="0" value="0" />
                    <Select.Item label="1" value="1" />
                    <Select.Item label="2" value="2" />
                    <Select.Item label="3" value="3" />
                    <Select.Item label="4" value="4" />
                    <Select.Item label="more" value="more" />
                </Select>
                <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                >
                    Please make a selection!
                </FormControl.ErrorMessage>
            </FormControl>
        </Center>
    );
};

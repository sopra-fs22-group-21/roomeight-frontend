import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../button';
import styles from './styles';
import DateInput from '../dateInput';
import { useSelector } from 'react-redux';
import en from '../../resources/strings/en.json';
import { KeyboardAvoidingView } from 'native-base';
import { Box, NormalText } from '../theme';
import { MoveInMoveOutInput } from '../moveInMoveOutInput';
import RangeSlider from 'rn-range-slider';
import { InputBox, InputLabel } from '../input';
import { AgeRange, NumberRange } from '../numberRange';
import Tags from '../tags';
import { ScrollView } from 'react-native-gesture-handler';
import { Gender, GenderInput } from '../gender';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import dateFormat from 'dateformat';
import colors from '../../resources/colors';

export const Filter = (props) => (
    <View style={styles.filter}>
        <NormalText style={styles.filterLabel}>{props.name}</NormalText>
        <Icon
            style={styles.closeIcon}
            name="close"
            onPress={props.onRemove}
            size={15}
        />
    </View>
);

const FilterSettings = (props) => {
    const { filters } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    const { isSearchingRoom } = useSelector(
        (state) => state.userprofileState.userprofile
    );
    const [newFilters, setNewFilters] = useState(
        filters ? filters : props.filters ? props.filters : {}
    );
    const [filteredElements, setFilteredElements] = useState([]);
    const [age, setAge] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [rent, setRent] = useState(null);
    const [nrRoommates, setNrRoommates] = useState(null);
    const [nrBathrooms, setNrBathrooms] = useState(null);
    const moveInLabel = isSearchingRoom
        ? 'Your latest possible move-in Date'
        : 'The latest possible move-in date';
    const moveOutLabel = isSearchingRoom
        ? 'Your earliest possible move-out Date'
        : 'The earliest possible move-out date';

    const deleteFilter = (name, objectOnRemove) => {
        let filters = { ...newFilters };
        if (objectOnRemove) {
            filters = {
                ...filters,
                ...objectOnRemove,
            };
        } else delete filters[name];
        setNewFilters(filters);
    };

    const setFilter = (el, name, label, objectOnRemove) => {
        el[name] = {
            name: label,
            objectOnRemove: objectOnRemove,
        };
    };

    useEffect(() => {
        const el = { ...filteredElements };
        let duration;
        if (newFilters.moveInDate)
            duration =
                'from ' +
                dateFormat(new Date(newFilters.moveInDate), 'dd.mm.yyyy');
        if (newFilters.moveOutDate)
            duration =
                ' until ' +
                dateFormat(new Date(newFilters.moveOutDate), 'dd.mm.yyyy');
        let selectedFilters = { ...filteredElements };
        if (duration)
            setFilter(selectedFilters, 'duration', duration, {
                moveInDate: undefined,
                moveOutDate: undefined,
            });
        else delete selectedFilters.duration;
        if (newFilters.gender)
            setFilter(selectedFilters, 'gender', newFilters.gender);
        else delete selectedFilters.gender;
        if (age) setFilter(selectedFilters, 'age', age + ' y/o');
        else delete selectedFilters.age;
        if (roomSize) setFilter(selectedFilters, 'roomSize', roomSize + 'm²');
        else delete selectedFilters.roomSize;
        if (rent) setFilter(selectedFilters, 'rent', rent + ' CHF');
        else delete selectedFilters.rent;
        if (nrRoommates)
            setFilter(selectedFilters, 'nrRoommates', nrRoommates + ' room8s');
        else delete selectedFilters.nrRoommates;
        if (nrBathrooms)
            setFilter(
                selectedFilters,
                'nrBathrooms',
                nrBathrooms + ' bathrooms'
            );
        else delete selectedFilters.nrBathrooms;
        if (newFilters.permanent != null && newFilters.permanent != undefined)
            setFilter(
                selectedFilters,
                'permanent',
                newFilters.permanent ? 'Permanent' : 'Temporary'
            );
        else delete selectedFilters.permanent;
        setFilteredElements(selectedFilters);
    }, [newFilters, age, roomSize, rent, nrRoommates, nrBathrooms]);

    const dates = (
        <MoveInMoveOutInput
            moveInLabel={moveInLabel}
            moveOutLabel={moveOutLabel}
            moveInDate={newFilters ? newFilters.moveInDate : null}
            moveOutDate={newFilters ? newFilters.moveOutDate : null}
            permanent={newFilters.permanent}
            onSetPermanent={(permanent) =>
                setNewFilters({
                    ...newFilters,
                    permanent: permanent,
                })
            }
            allowPermanentNull
            onSetMoveInDate={(date) => {
                if (date) {
                    setNewFilters({
                        ...newFilters,
                        moveInDate: date.toJSON(),
                    });
                }
            }}
            onSetMoveOutDate={(date) => {
                if (date) {
                    setNewFilters({
                        ...newFilters,
                        moveOutDate: date.toJSON(),
                    });
                }
            }}
        />
    );

    const tags = (
        <>
            <InputBox label={'Tags'}>
                <Tags
                    onChange={(tags) => {
                        let el = { ...newFilters };
                        if (tags.length > 0) el.tags = tags;
                        else delete el.tags;
                        setNewFilters(el);
                    }}
                    selected={newFilters.tags}
                />
            </InputBox>
        </>
    );

    const searchingFilters = (
        <>
            {dates}
            {tags}
            <NumberRange
                label="Rent"
                min={100}
                max={2000}
                low={
                    newFilters.rent && newFilters.rent.min
                        ? newFilters.rent.min
                        : null
                }
                high={
                    newFilters.rent && newFilters.rent.max
                        ? newFilters.rent.max
                        : null
                }
                step={10}
                minRange={100}
                onRangeChange={(range) => setRent(range)}
                onValueChange={(low, high) => {
                    setNewFilters({
                        ...newFilters,
                        rent: {
                            min: low,
                            max: high,
                        },
                    });
                }}
            />
            <NumberRange
                label="Room Size"
                min={7}
                max={40}
                low={
                    newFilters.roomSize && newFilters.roomSize.min
                        ? newFilters.roomSize.min
                        : null
                }
                high={
                    newFilters.roomSize && newFilters.roomSize.max
                        ? newFilters.roomSize.max
                        : null
                }
                minRange={4}
                onRangeChange={(range) => setRoomSize(range)}
                onValueChange={(low, high) => {
                    setNewFilters({
                        ...newFilters,
                        roomSize: {
                            min: low,
                            max: high,
                        },
                    });
                }}
            />
            <NumberRange
                label="Number of Room8s (including you)"
                min={2}
                max={10}
                low={
                    newFilters.nrRoommates && newFilters.nrRoommates.min
                        ? newFilters.nrRoommates.min
                        : null
                }
                high={
                    newFilters.nrRoommates && newFilters.nrRoommates.max
                        ? newFilters.nrRoommates.max
                        : null
                }
                onRangeChange={(range) => setNrRoommates(range)}
                onValueChange={(low, high) => {
                    setNewFilters({
                        ...newFilters,
                        nrRoommates: {
                            min: low,
                            max: high,
                        },
                    });
                }}
            />

            <NumberRange
                label="Number of Bathrooms"
                min={1}
                max={4}
                low={
                    newFilters.nrBathrooms && newFilters.nrBathrooms.min
                        ? newFilters.nrBathrooms.min
                        : null
                }
                high={
                    newFilters.nrBathrooms && newFilters.nrBathrooms.max
                        ? newFilters.nrBathrooms.max
                        : null
                }
                onRangeChange={(range) => setNrBathrooms(range)}
                onValueChange={(low, high) => {
                    setNewFilters({
                        ...newFilters,
                        nrBathrooms: {
                            min: low,
                            max: high,
                        },
                    });
                }}
            />
        </>
    );

    const advertisingFilters = (
        <>
            {dates}

            <NumberRange
                label={'Age'}
                min={16}
                max={40}
                low={
                    newFilters.age && newFilters.age.min
                        ? newFilters.age.min
                        : null
                }
                high={
                    newFilters.age && newFilters.age.max
                        ? newFilters.age.max
                        : null
                }
                minRange={4}
                onRangeChange={(range) => setAge(range)}
                onValueChange={(low, high) => {
                    setNewFilters({
                        ...newFilters,
                        age: {
                            min: low,
                            max: high,
                        },
                    });
                }}
            />

            {tags}

            <InputBox label="Gender">
                <GenderInput
                    onChange={(gender) => {
                        setNewFilters({
                            ...newFilters,
                            gender: gender,
                        });
                    }}
                    defaultValue={newFilters.gender}
                    size={20}
                />
            </InputBox>
        </>
    );

    const filterTags = () => (
        <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {Object.keys(filteredElements).map((key, i) => (
                    <Filter
                        key={i}
                        name={filteredElements[key].name}
                        onRemove={() =>
                            deleteFilter(
                                key,
                                filteredElements[key].objectOnRemove
                            )
                        }
                    />
                ))}
                {newFilters.tags
                    ? newFilters.tags.map((tag, index) => (
                          <Filter
                              key={index + 100}
                              name={tag}
                              onRemove={() => {
                                  let t = [...newFilters.tags].filter(
                                      (m) => m != tag
                                  );
                                  setNewFilters({
                                      ...newFilters,
                                      tags: t,
                                  });
                              }}
                          />
                      ))
                    : null}
            </View>

            <View
                style={{
                    borderBottomColor: colors.primary600,
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    marginBottom: 5,
                }}
            />
        </>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            {filterTags()}
            <View style={styles.inner}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box />
                    {isSearchingRoom ? searchingFilters : advertisingFilters}
                    <Box />
                </ScrollView>
                <Box />
                <PrimaryButton
                    onPress={() => props.onSave(newFilters, filterTags)}
                >
                    Save Filters
                </PrimaryButton>
            </View>
        </KeyboardAvoidingView>
    );
};
export default FilterSettings;

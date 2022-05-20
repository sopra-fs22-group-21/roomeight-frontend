import { React, useEffect, useState } from 'react';
import { View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { FlatDetailCard } from '../flatDetailCard';
import { EmptyCard } from '../publicProfileCard';

export const AddressMap = (props) => {
    const [coordinates, setCoordinates] = useState({
        lat: props.latitude ? props.latitude : 47.3769,
        lng: props.longitude ? props.longitude : 8.5417,
    });
    const [found, setFound] = useState(props.latitude && props.longitude);

    useEffect(async () => {
        if (props.address && props.resolveAddress) {
            try {
                let json;
                json = await Geocoder.from(props.address);
                let location = json.results[0].geometry.location;
                setCoordinates(location);
                if (props.onSuccess)
                    props.onSuccess(location.lat, location.lng);
                console.log(location);
                setFound(true);
            } catch (error) {
                console.warn(error);
                if (props.onError) props.onError(error);
                setFound(false);
            }
        }
    }, [props.address]);

    return (
        <>
            <MapView
                style={{ width: '100%', height: '100%' }}
                region={{
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {found ? (
                    <Marker
                        key={0}
                        coordinate={{
                            latitude: coordinates.lat,
                            longitude: coordinates.lng,
                        }}
                    />
                ) : null}
            </MapView>
        </>
    );
};

export const MatchesMap = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    const coordinates =
        Object.values(matches).length > 0
            ? Object.values(matches)[0].addressCoordinates
            : null;
    const lat = coordinates ? coordinates.latitude : 47.3769;
    const lng = coordinates ? coordinates.longitude : 8.5417;
    return (
        <View style={{ flex: 1, paddingVertical: 20 }}>
            <MapView
                style={{ width: '100%', height: '100%', borderRadius: 20 }}
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
            >
                {Object.values(matches).map((match, index) => {
                    return (
                        <Marker
                            key={index}
                            onCalloutPress={() =>
                                navigation.navigate('Match', { profile: match })
                            }
                            coordinate={match.addressCoordinates}
                            title={match.name}
                            description={match.biography}
                        />
                    );
                })}
            </MapView>
        </View>
    );
};

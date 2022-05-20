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
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
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
    const LAT = 47.3769;
    const LNG = 8.5417;
    const { matches } = useSelector((state) => state.matchesState);
    return (
        <View style={{ flex: 1, paddingVertical: 20 }}>
            <MapView
                style={{ width: '100%', height: '100%', borderRadius: 20 }}
                region={{
                    latitude: LAT,
                    longitude: LNG,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {Object.values(matches).map((match, index) => {
                    console.log(match.address);
                    return (
                        <Marker
                            key={index}
                            onCalloutPress={() =>
                                navigation.navigate('Match', { profile: match })
                            }
                            coordinate={{
                                latitude: match.addressCoordinates.latitude,
                                longitude: match.addressCoordinates.longitude,
                            }}
                            title={match.name}
                            description={match.description}
                        />
                    );
                })}
            </MapView>
        </View>
    );
};

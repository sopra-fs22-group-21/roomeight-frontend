import { React, useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Box, NormalText, Strong } from '../theme';
import Geocoder from 'react-native-geocoding';

export const AddressMap = (props) => {
    const [coordinates, setCoordinates] = useState({
        lat: 47.3769,
        lng: 8.5417,
    });
    const [found, setFound] = useState(true);

    useEffect(async () => {
        try {
            let json;
            // json = await Geocoder.from(props.address);
            let location = json.results[0].geometry.location;
            setCoordinates(location);
            props.onSuccess(location);
            setFound(true);
        } catch (error) {
            console.warn(error);
            props.onError(error);
            setFound(false);
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

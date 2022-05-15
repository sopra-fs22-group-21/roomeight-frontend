import { React, useEffect, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';

export const AddressMap = (props) => {
    const [coordinates, setCoordinates] = useState({
        lat: props.latitude ? props.latitude : 47.3769,
        lng: props.longitude ? props.longitude : 8.5417,
    });
    const [found, setFound] = useState(true);

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

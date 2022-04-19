import React, { useCallback, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "./LocationMap.scss";
import { useMapLocationCacheContext } from "providers/MapLocationCacheProvider";

interface LocationMapProps {
    location: string;
}

export default function LocationMap({location}: LocationMapProps): JSX.Element {
    const {cacheLocation, getCachedLocation} = useMapLocationCacheContext();

    const addPopupMessage = (map: tt.Map, message: string) => {
        new tt.Popup({className: "rental-map-popup", closeButton: false, closeOnClick: false})
            .setLngLat(new tt.LngLat(0,0))
            .setHTML(`<p>${message}</p>`)
            .addTo(map);
    };

    const setAndCenterMarker = (map: tt.Map, position: tt.LngLatLike) => {
        map.setCenter(position);

        const markerElem = document.createElement("div");
        markerElem.className = "rental-location-marker";
        new tt.Marker({
            element: markerElem
        })
        .setLngLat(position)
        .addTo(map);
    };

    const requestPosition = useCallback(async (location: string, apiKey: string) => {
        return getCachedLocation(location) ??
            fetch(`https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`)
                .then(resp => resp.json())
                .then(json => {
                    if(!json?.results.length) {
                        throw new Error("Location not found!");
                    }

                    const position = json.results[0].position;
                    cacheLocation(location, position);
                    return position;
                });
    }, [cacheLocation, getCachedLocation]);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_TOM_TOM_KEY as string;
        const map = tt.map({
            key: apiKey,
            container: "rental-location-map",
            zoom: 13,
            maxZoom: 15
        });
        map.addControl(new tt.NavigationControl());

        requestPosition(location, apiKey)
            .then((position) => {
                setAndCenterMarker(map, position);
            })
            .catch((error) => {
                addPopupMessage(map, error);
            });
    }, [location, requestPosition]);

    return <div id="rental-location-map" />;
}

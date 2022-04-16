import React, { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "./LocationMap.scss";

export default function LocationMap(): JSX.Element {
    useEffect(() => {
        const map = tt.map({
            key: process.env.REACT_APP_TOM_TOM_KEY as string,
            container: "rental-location-map",
            zoom: 13
        });
        map.addControl(new tt.NavigationControl());
        map.setCenter([-0.118092, 51.5072]);
        new tt.Marker({})
            .setLngLat([-0.118092, 51.5072])
            .addTo(map);
    }, []);

    return <div id="rental-location-map" />;
}

import React, { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "./LocationMap.scss";

interface LocationMapProps {
    location: string;
}

export default function LocationMap({location}: LocationMapProps): JSX.Element {
    useEffect(() => {
        const apiKey = process.env.REACT_APP_TOM_TOM_KEY as string;
        const map = tt.map({
            key: apiKey,
            container: "rental-location-map",
            zoom: 13,
            maxZoom: 15
        });
        map.addControl(new tt.NavigationControl());

        fetch(`https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`)
            .then(resp => resp.json())
            .then(json => {
                const position = json.results[0].position;            
                map.setCenter(position);

                const markerElem = document.createElement("div");
                markerElem.className = "rental-location-marker";
                new tt.Marker({
                    element: markerElem
                })
                .setLngLat(position)
                .addTo(map);
            });     
    }, []);

    return <div id="rental-location-map" />;
}

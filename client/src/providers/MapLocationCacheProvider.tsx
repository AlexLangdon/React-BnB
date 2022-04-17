import tt from "@tomtom-international/web-sdk-maps";
import React, { createContext, useContext, useRef } from "react";

interface MapLocationCacheProviderProps {
    children: React.ReactNode;
}

const MapContext = createContext<any>({});

export const useMapContext = () => {
    return useContext(MapContext);
};

export default function MapLocationCacheProvider({children}: MapLocationCacheProviderProps) {
    const cache = useRef(new Map<string, tt.LngLatLike>());
    
    const cacheLocation = (location: string, position: tt.LngLatLike) => {
        cache.current.set(location, position);
    };

    const getCachedLocation = (location: string) => {
        return cache.current.get(location);
    };

    const mapContextApi = {
        cacheLocation,
        getCachedLocation
    };

    return (
        <MapContext.Provider value={mapContextApi}>
            {children}
        </MapContext.Provider>
    );
}
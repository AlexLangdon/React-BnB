import tt from "@tomtom-international/web-sdk-maps";
import React, { createContext, useContext, useRef } from "react";

interface MapLocationCacheProviderProps {
    children: React.ReactNode;
}

interface MapContextInterface {
    cacheLocation: (location: string, position: tt.LngLatLike) => void;
    getCachedLocation: (location: string) => tt.LngLatLike | undefined;
}

const MapContext = createContext<MapContextInterface | null>(null);

export const useMapLocationCacheContext = () => {
    const context = useContext(MapContext);
    if(!context) {
        throw new Error("ERROR: Cannot create context for MapLocationCacheProvider");
    }
    return context;
};

export default function MapLocationCacheProvider({children}: MapLocationCacheProviderProps) {
    const cache = useRef(new Map<string, tt.LngLatLike>());
    
    const cacheLocation = (location: string, position: tt.LngLatLike) => {
        cache.current.set(location, position);
    };

    const getCachedLocation = (location: string) => {
        return cache.current.get(location);
    };

    const mapContextApi: MapContextInterface = {
        cacheLocation,
        getCachedLocation
    };

    return (
        <MapContext.Provider value={mapContextApi}>
            {children}
        </MapContext.Provider>
    );
}
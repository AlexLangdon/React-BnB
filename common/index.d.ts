export declare type Amenity = "Air Conditioning" | "Dishwasher" | "Dryer" | "Free Breakfast" | "Free Parking" | "Fridge Freezer" | "Heating" | "Washing Machine" | "Wifi" | "Work Area";
export interface RentalOption {
    id: string;
    title: string;
    city: string;
    category: "Room" | "Apartment" | "House";
    imageSrc: string;
    numRooms: number;
    shared: boolean;
    description: string;
    dailyPrice: number;
    amenities: Array<Amenity>;
}

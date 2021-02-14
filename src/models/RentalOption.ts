import { Amenity } from "models/Amenity";

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
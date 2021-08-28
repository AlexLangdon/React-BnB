import { RentalCategory } from "./RentalCategory";
import { Amenity } from "./Amenity";

export interface Rental {
	_id: string;
	title: string;
	city: string;
	category: RentalCategory;
	imageSrc: string;
	numRooms: number;
	shared: boolean;
	description: string;
	dailyPrice: number;
	amenities: Array<Amenity>;
}
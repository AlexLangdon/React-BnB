import { Amenity } from "./Amenity";
import { RentalCategory } from "./RentalCategory";

export interface CreateRentalRequest {
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
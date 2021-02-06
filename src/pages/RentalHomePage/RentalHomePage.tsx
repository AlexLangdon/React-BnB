import React from "react";
import RentalOptionCard from "../../components/RentalOptionCard/RentalOptionCard";
import { RentalOption } from "../../models/RentalOption";
import "./RentalHomePage.scss";

export default function RentalHomePage(): JSX.Element {
	const rentalOptions: Array<RentalOption> = new Array(10).fill(null).map((_, i) => ({
		id: i.toString(),
		title: "Modern apartment in city center",
		city: "London",
		category: "Apartment",
		imageSrc: "http://via.placeholder.com/300x200",
		numRooms: 1,
		shared: false,
		description: "Stylish third floor apartment in the heart of London",
		dailyPrice: 100
	}));

	return (
		<div className="rental-home-root mt-5 mx-auto px-5">
			<h1 className="title text-center col-sm-12 mb-4">Experience the world</h1>
			<div className="d-flex flex-wrap justify-content-center">
				{rentalOptions.map((option) => <RentalOptionCard key={option.id} {...option} />)}
			</div>
		</div>
	);
}

import RentalOptionCard from "components/RentalOptionCard/RentalOptionCard";
import { RentalOption } from "models/RentalOption";
import React from "react";
import store from "store/store";
import "./RentalHomePage.scss";

export default function RentalHomePage(): JSX.Element {
	const rentals = store.getRentalOptions();

	return (
		<div className="rental-home-root mt-5 mx-auto px-5">
			<h1 className="title text-center col-sm-12 mb-4">Experience the world</h1>
			<div className="d-flex flex-wrap justify-content-center">
				{rentals.map((option: RentalOption) => <RentalOptionCard key={option.id} {...option} />)}
			</div>
		</div>
	);
}
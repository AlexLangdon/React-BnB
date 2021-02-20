import RentalOptionCard from "components/RentalOptionCard/RentalOptionCard";
import React from "react";
import { RentalOption } from "react-bnb-common";
import { useSelector } from "react-redux";
import { rentalsSelector } from "store/slices/rentals";
import "./RentalHomePage.scss";

export default function RentalHomePage(): JSX.Element {
	const rentals = useSelector(rentalsSelector);

	return (
		<div className="rental-home-root mt-5 mx-auto px-5">
			<h1 className="title text-center col-sm-12 mb-4">Experience the world</h1>
			<div className="d-flex flex-wrap justify-content-center">
				{rentals.map((option: RentalOption) => <RentalOptionCard key={option.id} {...option} />)}
			</div>
		</div>
	);
}
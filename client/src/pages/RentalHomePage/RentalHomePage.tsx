import axios from "axios";
import RentalCard from "components/RentalCard/RentalOptionCard";
import React, { useEffect } from "react";
import { Rental } from "react-bnb-common";
import { useSelector } from "react-redux";
import { rentalsSelector, setRentals } from "store/slices/rentals";
import store from "store/store";
import "./RentalHomePage.scss";

export default function RentalHomePage(): JSX.Element {
	const rentals = useSelector(rentalsSelector);

	useEffect(() => {
		axios.get("api/rentals").then(response => {
			console.log("response", response);
			store.dispatch(setRentals(response.data));
		});
	}, []);

	return (
		<div className="rental-home-root mt-5 mx-auto px-5">
			<h1 className="title text-center col-sm-12 mb-4">Experience the world</h1>
			<div className="d-flex flex-wrap justify-content-center">
				{rentals.map((option: Rental) => <RentalCard key={option._id} {...option} />)}
			</div>
		</div>
	);
}
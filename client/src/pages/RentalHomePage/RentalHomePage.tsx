import axios from "axios";
import RentalCard from "components/RentalCard/RentalCard";
import React, { useEffect, useMemo } from "react";
import { Rental } from "react-bnb-common";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { rentalsSelector, setRentals } from "store/slices/rentals";
import store from "store/store";
import "./RentalHomePage.scss";

export default function RentalHomePage(props: RouteComponentProps<{ location: string; }>): JSX.Element {
	const { location } = props.match.params;
	const rentals = useSelector(rentalsSelector);

	useEffect(() => {
		const params = {
			city: location
		};

		axios.get("/api/rentals", {params}).then(response => {
			console.log("response", response);
			store.dispatch(setRentals(response.data));
		});
	}, [location]);

	const title = useMemo(() => `Experience ${location ?? "the world"}`, [location]);

	return (
		<div className="rental-home-root mt-5 mx-auto px-5">
			<h1 className="title text-center col-sm-12 mb-4">{title}</h1>
			<div className="d-flex flex-wrap justify-content-center">
				{rentals.length ? rentals.map((option: Rental) => <RentalCard key={option._id} {...option} />)
				: <h2>No matching rentals found</h2>}
			</div>
		</div>
	);
}
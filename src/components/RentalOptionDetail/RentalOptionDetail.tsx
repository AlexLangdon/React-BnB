import { Button, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { rentalsByIdSelectorFactory } from "store/slices/rentals";

export default function RentalOptionDetail(props: RouteComponentProps<{ rentalId: string; }>): JSX.Element {
	const { rentalId } = props.match.params;

	const rental = useSelector(rentalsByIdSelectorFactory(rentalId));

	return <div className="container pt-4">
		<Button variant="contained" startIcon={<ArrowBackIosIcon />} href="/">Back</Button>
		{rental ? (
			<>
				<div className="row justify-content-center">
					<img src="http://via.placeholder.com/350x250" className="col-md-6 my-3" alt="rental" />
					<img src="http://via.placeholder.com/350x250" className="col-md-6 my-3" alt="location" />
				</div>
				<Typography variant="subtitle2" color="textSecondary">
					{rental.shared ? "Shared" : "Private"} {rental.category} - {rental.city}
				</Typography>
				<h4>{rental.title}</h4>
				<p>{rental.numRooms} {rental.numRooms > 1 ? "Rooms" : "Room"}</p>
				<p>{rental.description}</p>
				<hr />
				<h4>Assets</h4>
			</>
		) : <h1 className="pt-2">Rental Not Found</h1>}
	</div>;
}
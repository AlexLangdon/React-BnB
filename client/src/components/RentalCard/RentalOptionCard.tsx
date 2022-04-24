import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Rental } from "react-bnb-common";
import { Link } from "react-router-dom";
import "./RentalOptionCard.scss";

export default function RentalCard(rental: Rental): JSX.Element {
	return (
		<Card className="rental-option-card m-3">
			<CardActionArea component={Link} to={`/rental/${rental._id}`}>
				<CardMedia className="rental-card-image" image={rental.image.url} />
				<CardContent>
					<Typography className="text-capitalize" variant="subtitle2" color="textSecondary">
						{rental.shared ? "Shared" : "Private"} {rental.category} - {rental.numRooms} {
							rental.numRooms > 1 ? "Rooms" : "Room"
						} - {rental.city}
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						{rental.title}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£{rental.dailyPrice} per night - Free Cancellation
				</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
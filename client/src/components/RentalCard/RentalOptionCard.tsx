import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Rental } from "react-bnb-common";

export default function RentalCard(option: Rental): JSX.Element {
	return (
		<Card className="rental-option-card m-3">
			<CardActionArea href={`/rental/${option._id}`}>
				<CardMedia className="rental-card-image" image={option.imageSrc} />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						{option.shared ? "Shared" : "Private"} {option.category} - {option.numRooms} {
							option.numRooms > 1 ? "Rooms" : "Room"
						} - {option.city}
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						{option.title}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£{option.dailyPrice} per night - Free Cancellation
				</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
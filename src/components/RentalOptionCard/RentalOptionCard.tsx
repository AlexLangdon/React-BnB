import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { RentalOption } from "../../models/RentalOption";

export default function RentalOptionCard(option: RentalOption) {
	return <Card className="rental-option-card m-3">
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
	</Card>
}
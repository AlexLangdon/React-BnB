import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import "./RentalHomePage.scss";

export default function RentalHomePage() {
	return <div className="rental-home-root mt-5 mx-auto px-5">
		<h1 className="title text-center col-sm-12 mb-4">Experience the world</h1>
		<div className="d-flex flex-wrap justify-content-center">
			<Card className="rental-option-card m-3">
				<CardMedia className="rental-card-image" image="http://via.placeholder.com/300x200" />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						WHOLE APARTMENT - LONDON
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						Cozy Place
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£30 per Night - Free Cancellation
					</Typography>
				</CardContent>
			</Card>
			<Card className="rental-option-card m-3">
				<CardMedia className="rental-card-image" image="http://via.placeholder.com/300x200" />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						WHOLE APARTMENT - LONDON
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						Cozy Place
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£30 per Night - Free Cancellation
					</Typography>
				</CardContent>
			</Card>
			<Card className="rental-option-card m-3">
				<CardMedia className="rental-card-image" image="http://via.placeholder.com/300x200" />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						WHOLE APARTMENT - LONDON
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						Cozy Place
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£30 per Night - Free Cancellation
					</Typography>
				</CardContent>
			</Card>
			<Card className="rental-option-card m-3">
				<CardMedia className="rental-card-image" image="http://via.placeholder.com/300x200" />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						WHOLE APARTMENT - LONDON
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						Cozy Place
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£30 per Night - Free Cancellation
					</Typography>
				</CardContent>
			</Card>
			<Card className="rental-option-card m-3">
				<CardMedia className="rental-card-image" image="http://via.placeholder.com/300x200" />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						WHOLE APARTMENT - LONDON
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						Cozy Place
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£30 per Night - Free Cancellation
					</Typography>
				</CardContent>
			</Card>
			<Card className="rental-option-card m-3">
				<CardMedia className="rental-card-image" image="http://via.placeholder.com/300x200" />
				<CardContent>
					<Typography variant="subtitle2" color="textSecondary">
						WHOLE APARTMENT - LONDON
					</Typography>
					<Typography variant="h6" className="font-weight-bold">
						Cozy Place
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						£30 per Night - Free Cancellation
					</Typography>
				</CardContent>
			</Card>
		</div>
	</div>
}
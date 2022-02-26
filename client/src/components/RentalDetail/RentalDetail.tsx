import { Button, Typography } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import KitchenIcon from "@material-ui/icons/Kitchen";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import WavesIcon from "@material-ui/icons/Waves";
import WifiIcon from "@material-ui/icons/Wifi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Amenity, Rental } from "react-bnb-common";
import { RouteComponentProps } from "react-router-dom";

export default function RentalDetail(props: RouteComponentProps<{ rentalId: string; }>): JSX.Element {
	const { rentalId } = props.match.params;
	const [isLoading, setIsLoading] = useState(true);
	const [rental, setRental] = useState(null);

	useEffect(() => {
		axios.get(`/api/rentals/${rentalId}`).then(resp => {
			setRental(resp.data);
			setIsLoading(false);
		});
	}, [rentalId]);

	const getAmenityIcon = (amenity: Amenity) => {
		const mapping: Record<Amenity, JSX.Element> = {
			"Air Conditioning": <AcUnitIcon />,
			"Dishwasher": <LocalDiningIcon />,
			"Dryer": <WavesIcon />,
			"Free Breakfast": <FreeBreakfastIcon />,
			"Free Parking": <LocalParkingIcon />,
			"Fridge Freezer": <KitchenIcon />,
			"Heating": <FireplaceIcon />,
			"Washing Machine": <LocalLaundryServiceIcon />,
			"Wifi": <WifiIcon />,
			"Work Area": <LaptopChromebookIcon />
		};

		return mapping[amenity];
	};

	const renderRentalDetails = (rentalInput: Rental | null) => (
		rentalInput ? <>
			<div className="row justify-content-center">
				<img src={rentalInput.image.url} className="col-md-6 my-3" alt="rental" />
				<img src="http://via.placeholder.com/350x250" className="col-md-6 my-3" alt="location" />
			</div>
			<Typography variant="subtitle2" color="textSecondary">
				{rentalInput.shared ? "Shared" : "Private"} {rentalInput.category} - {rentalInput.city}
			</Typography>
			<h4>{rentalInput.title}</h4>
			<div className="m-3">
				<p>{rentalInput.numRooms} {rentalInput.numRooms > 1 ? "Rooms" : "Room"}</p>
				<p>{rentalInput.description}</p>
			</div>
			<hr />
			<h4>Amenities</h4>
			<div>
				{rentalInput.amenities.map((amenity: Amenity) =>
					<div key={amenity} className="d-inline-block m-3">
						{getAmenityIcon(amenity)} {amenity}
					</div>
				)}
			</div>
		</> : <h1 className="pt-2">Rental Not Found</h1>
	);

	return <div className="container pt-4">
		<Button variant="contained" startIcon={<ArrowBackIosIcon />} href="/">Back</Button>
		{isLoading ? <h1 className="pt-2">Loading</h1> : renderRentalDetails(rental)}
	</div>;
}
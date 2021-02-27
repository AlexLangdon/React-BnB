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
import React from "react";
import { Amenity } from "react-bnb-common";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { rentalsByIdSelectorFactory } from "store/slices/rentals";

export default function RentalDetail(props: RouteComponentProps<{ rentalId: string; }>): JSX.Element {
	const { rentalId } = props.match.params;

	const rental = useSelector(rentalsByIdSelectorFactory(rentalId));

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
				<div className="m-3">
					<p>{rental.numRooms} {rental.numRooms > 1 ? "Rooms" : "Room"}</p>
					<p>{rental.description}</p>
				</div>
				<hr />
				<h4>Assets</h4>
				<div>
					{rental.amenities.map((amenity: Amenity) =>
						<div key={amenity} className="d-inline-block m-3">
							{getAmenityIcon(amenity)} {amenity}
						</div>
					)}
				</div>
			</>
		) : <h1 className="pt-2">Rental Not Found</h1>}
	</div>;
}
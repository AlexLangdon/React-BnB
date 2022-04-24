import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import moment from "moment";
import React from "react";
import { Booking } from "react-bnb-common";
import { Link } from "react-router-dom";
import { cancelBooking } from "services/BookingService";
import "./BookingCard.scss";

function formatDateString(date: ParsableDate<string>): string {
    return moment(date).format("Do MMMM YYYY");
}

export function BookingCard(booking: Booking): JSX.Element {
    return <Card className="booking-card m-3">
        <CardContent>
            <p>{formatDateString(booking.startAt)} to {formatDateString(booking.endAt)}</p>
            <hr />
            <p>Guests: <b>{booking.guests}</b></p>
            <p>Total Price: <b>£{booking.totalCost}</b></p>
        </CardContent>
        <CardActions>
            <Button variant="contained">
                <Link to={`/rental/${booking.rentalId}`}>View Rental</Link>
            </Button>
            <Button variant="contained" className="cancel-button" 
                onClick={() => cancelBooking(booking._id)}>
                Cancel Booking
            </Button>
        </CardActions>
    </Card>;
}
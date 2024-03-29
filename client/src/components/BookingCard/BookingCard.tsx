import { capitalize, Card, CardContent, Typography } from "@material-ui/core";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import moment from "moment";
import React from "react";
import { Booking } from "react-bnb-common";
import "./BookingCard.scss";

function formatDateString(date: ParsableDate<string>): string {
    return moment(date).format("Do MMMM YYYY");
}

function formatDateTimeString(date: ParsableDate<string>): string {
    return moment(date).format("Do MMMM YYYY HH:mm");
}

export function BookingCard(booking: Booking): JSX.Element {
    return <Card className="booking-card m-3">
        <CardContent>
            <Typography gutterBottom variant="h6">
                {booking.rental.title} - {capitalize(booking.rental.city)}
            </Typography>
            <p>{formatDateString(booking.startAt)} to {formatDateString(booking.endAt)}</p>
            <hr />
            <p>Booked by: <b>{booking.user.username}</b></p>
            <p>Guest contact: <b>{booking.user.email}</b></p>
            <p>Guests: <b>{booking.guests}</b></p>
            <p>Total Price: <b>£{booking.totalCost}</b></p>
            <p>Created at: <b>{formatDateTimeString(booking.createdAt)}</b></p>
        </CardContent>
    </Card>;
}
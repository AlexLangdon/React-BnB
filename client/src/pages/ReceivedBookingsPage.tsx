import { Box, Button } from "@material-ui/core";
import { BookingCard } from "components/BookingCard/BookingCard";
import React, { useEffect, useState } from "react";
import { Booking } from "react-bnb-common";
import { Link } from "react-router-dom";
import { getReceivedBookings } from "services/BookingService";

export default function ReceivedBookingsPage(): JSX.Element {
    const [bookings, setBookings] = useState<Array<Booking>>([]);

    useEffect(() => {
        getReceivedBookings().then((bookings) => {
            setBookings(bookings);
        });
    }, []);

    return <div className="d-flex flex-wrap justify-content-center">
            {
                bookings.map((booking) => (
                    <Box key={booking._id} className="border border-secondary rounded m-2">
                        <BookingCard {...booking} />
                        <div className="m-3">
                            <Button variant="contained">
                                <Link to={`/rental/${booking.rental._id}`}>View Rental</Link>
                            </Button>
                        </div>
                    </Box>
                ))
            }
    </div>;
}

import { Box, Button } from "@material-ui/core";
import { BookingCard } from "components/BookingCard/BookingCard";
import React, { useEffect, useState } from "react";
import { Booking } from "react-bnb-common";
import { Link } from "react-router-dom";
import { getCurrentUserBookings } from "services/BookingService";
import { cancelBooking } from "services/BookingService";

export default function ManageBookingsPage(): JSX.Element {
    const [bookings, setBookings] = useState<Array<Booking>>([]);

    function fetchBookings() {
        getCurrentUserBookings().then((bookings) => {
            setBookings(bookings);
        });
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    function confirmDeletion(): boolean {
        return window.confirm("Are you sure you want to cancel this booking?");
    }
    
    function beginCancelBooking(bookingId: string): void {
        if(confirmDeletion()) {
            cancelBooking(bookingId)
                .then(() => {
                    fetchBookings();
                });
        }
    }

    return <div className="d-flex flex-wrap justify-content-center">
        {
            bookings.length ? bookings.map((booking) => (
                <Box key={booking._id} className="border border-secondary rounded m-2">
                    <BookingCard {...booking} />
                    <div className="m-3">
                        <Button variant="contained">
                            <Link to={`/rental/${booking.rental._id}`}>View Rental</Link>
                        </Button>
                        <Button variant="contained" className="danger-button ml-2" 
                            onClick={() => beginCancelBooking(booking._id)}>
                            Cancel Booking
                        </Button>
                    </div>
                </Box>
            )) : <h2 className="my-5">No Bookings Found</h2>
        }
    </div>;
}

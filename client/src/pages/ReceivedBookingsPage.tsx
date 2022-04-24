import { BookingCard } from "components/BookingCard/BookingCard";
import React, { useEffect, useState } from "react";
import { Booking } from "react-bnb-common";
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
                    <BookingCard key={booking._id} {...booking} />
                ))
            }
    </div>;
}

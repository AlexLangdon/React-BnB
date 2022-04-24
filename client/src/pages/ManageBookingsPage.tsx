import { BookingCard } from "components/BookingCard/BookingCard";
import React, { useEffect, useState } from "react";
import { Booking } from "react-bnb-common";
import { getCurrentUserBookings } from "services/BookingService";

export default function ManageBookingsPage(): JSX.Element {
    const [bookings, setBookings] = useState<Array<Booking>>([]);

    useEffect(() => {
        getCurrentUserBookings().then((bookings) => {
            setBookings(bookings);
        });
    }, []);

    return <div>
        {
            bookings.map((booking) => (
                <BookingCard key={booking._id} {...booking} />
            ))
        }
    </div>;
}

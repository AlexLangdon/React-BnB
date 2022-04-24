import RentalCard from "components/RentalCard/RentalOptionCard";
import React, { useEffect, useState } from "react";
import { Rental } from "react-bnb-common";
import { getCurrentUserRentals } from "services/RentalService";

export default function ManageRentalsPage(): JSX.Element {
    const [rentals, setRentals] = useState<Array<Rental>>([]);

    useEffect(() => {
        getCurrentUserRentals().then((rentals) => {
            setRentals(rentals);
        });
    }, []);

    return <div className="d-flex flex-wrap justify-content-center">
        {
            rentals.map((rental) => (
                <RentalCard key={rental._id} {...rental} />
            ))
        }
    </div>;
}

import { Box, Button } from "@material-ui/core";
import RentalCard from "components/RentalCard/RentalCard";
import React, { useEffect, useState } from "react";
import { Rental } from "react-bnb-common";
import { deleteRental, getCurrentUserRentals } from "services/RentalService";

export default function ManageRentalsPage(): JSX.Element {
    const [rentals, setRentals] = useState<Array<Rental>>([]);

    function fetchUserRentals() {
        getCurrentUserRentals().then((rentals) => {
            setRentals(rentals);
        });
    }

    useEffect(() => {
        fetchUserRentals();
    }, []);

    function confirmDeletion(): boolean {
        return window.confirm("Are you sure you want to delete this rental?");
    }
    
    function beginDeleteRental(rentalId: string): void {
        if(confirmDeletion()) {
            deleteRental(rentalId)
                .then(() => {
                    fetchUserRentals();
                });
        }
    }

    return <div className="d-flex flex-wrap justify-content-center">
        {
            rentals.length ? rentals.map((rental) => (
                <Box key={rental._id} className="border border-secondary rounded m-2">
                    <RentalCard {...rental} />
                    <div className="m-3">
                        <Button className="danger-button" variant="contained"
                            onClick={() => beginDeleteRental(rental._id)}>Delete</Button>
                    </div>
                </Box>
            )) : <h2 className="my-5">No Rentals Found</h2>
        }
    </div>;
}

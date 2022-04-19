import { TextField, Box, Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { DateRangePicker, RangeInput } from "@material-ui/pickers";
import React, { useState } from "react";
import { Rental } from "react-bnb-common";

export default function BookingForm(rental: Rental): JSX.Element {
    const [bookingDateRange, setBookingDateRange] = useState<RangeInput<string>>([Date.now(), Date.now() + 10000000]);
    const [guests, setGuests] = useState(1);
    const [showConfirmModal, setConfirmModalShown] = useState(false);

    return <div className="border rounded p-3">
        <form>
            <span>
                <Typography variant="h5" className="d-inline-block">£{rental.dailyPrice}</Typography> per night
            </span>
            <hr />
            <div className="form-group">
                <label htmlFor="dates">Dates:</label>
                <DateRangePicker
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField {...startProps} />
                            <Box className="mx-1"> to </Box>
                            <TextField {...endProps} />
                        </React.Fragment>
                    )}
                    inputFormat="dd/MM/yyyy" 
                    onChange={(v) => {
                        setBookingDateRange(v);
                    }}
                    value={bookingDateRange} />
            </div>
            <div className="form-group">
                <label htmlFor="guests">Guests:</label>
                <input id="guests" 
                    type="number" 
                    value={guests} 
                    onChange={(e) => setGuests(e.currentTarget.valueAsNumber)} 
                    min="1" 
                    max="8" 
                    className="form-control"
                />
            </div>
            <Button variant="contained" 
                color="secondary" 
                className="mt-2 form-control"
                onClick={() => setConfirmModalShown(true)}
            >
                <b>Reserve your place now</b>
            </Button>
            <Modal open={showConfirmModal}
                onClose={() => setConfirmModalShown(false)}
                >
                <div>
                    <p>Guests: <em>{guests}</em></p>
                    <p>Price: <em>${rental.dailyPrice}</em></p>
                    <p>Do you confirm your booking for selected days?</p>
                    <button>Confirm</button>
                    <button>Cancel</button>
                </div>
            </Modal>
        </form>
    </div>;
}

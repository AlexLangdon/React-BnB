import { TextField, Modal, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { DateRangePicker, RangeInput } from "@material-ui/pickers";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { Rental } from "react-bnb-common";

export default function BookingForm(rental: Rental): JSX.Element {
    const dateNow = Date.now();
    const defaultEndDate = moment(dateNow).add(5, "days").toDate();
    const [bookingDateRange, setBookingDateRange] = useState<RangeInput<string>>([dateNow, defaultEndDate]);
    const [guests, setGuests] = useState(1);
    const [showConfirmModal, setConfirmModalShown] = useState(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4
    };

    const days = useMemo(
        () => {
            const start = moment(bookingDateRange[0]);
            const end = moment(bookingDateRange[1]);
            return Math.ceil(moment.duration(end.diff(start)).asDays());
        },
        [bookingDateRange]
    );

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
                <Box css={style}>
                    <p>
                        <Typography variant="h5" className="text-capitalize">{rental.category} in {rental.city}</Typography>
                        {moment(bookingDateRange[0]).format("Do MMMM YYYY")} to {moment(bookingDateRange[1]).format("Do MMMM YYYY")}
                    </p>
                    <p>Duration: <b>{days}</b> days</p>
                    <p>Price: <b>£{rental.dailyPrice}</b> per day</p>
                    <p>Guests: <b>{guests}</b></p>
                    <p>Total Price: <b>£{days * rental.dailyPrice}</b></p>
                    <p>Do you confirm your booking for the selected days?</p>
                    <hr />
                    <div>
                        <Button variant="contained" className="mr-2" color="secondary" 
                            onClick={() => setConfirmModalShown(false)}>Confirm</Button>
                        <Button variant="contained" 
                            onClick={() => setConfirmModalShown(false)}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
        </form>
    </div>;
}

import { Box, MenuItem, Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { DateRangePicker, RangeInput } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import moment from "moment";
import { createBooking, getBookingsForRental } from "services/BookingService";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Booking, Rental } from "react-bnb-common";

export default function BookingForm(rental: Rental): JSX.Element {
    const dateNow = Date.now();
    const defaultStartDate = moment(dateNow).add(7, "days").toDate();
    const defaultEndDate = moment(dateNow).add(10, "days").toDate();
    const [bookingDateRange, setBookingDateRange] = useState<RangeInput<string>>([defaultStartDate, defaultEndDate]);
    const [bookingDateRangeError, setBookingDateRangeError] = useState<unknown | null>(null);
    const [guests, setGuests] = useState(1);
    const guestOptions = Array.from(Array(8)).map((_, i) => i + 1);
    const [showConfirmModal, setConfirmModalShown] = useState(false);
    const [bookingsForRental, setBookingsForRental] = useState<Array<Booking>>([]);

    const modalStyle = {
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

    const numDaysSelected = useMemo(
        () => {
            const start = moment(bookingDateRange[0]);
            const end = moment(bookingDateRange[1]);
            return Math.ceil(moment.duration(end.diff(start)).asDays());
        },
        [bookingDateRange]
    );

    const isFormValid = useMemo(
        () => Boolean(bookingDateRange[0]) && Boolean(bookingDateRange[1]) && !bookingDateRangeError, 
        [bookingDateRange, bookingDateRangeError]
    );

    function onSubmit(e: FormEvent): void {
        e.preventDefault();
        createBooking({
            rental: rental._id,
            startAt: moment(bookingDateRange[0]).toDate(),
            endAt: moment(bookingDateRange[1]).toDate(),
            totalCost: numDaysSelected * rental.dailyPrice,
            guests
        });
    }

    function formatDateString(date: ParsableDate<string>): string {
        return moment(date).format("Do MMMM YYYY");
    }

    function isDateDisabled(date: unknown): boolean {
        if(date instanceof Date) {
            if(date.valueOf() < Date.now()) {
                return true;
            }
            
            return bookingsForRental.some((booking) => (
                moment(booking.startAt).startOf("day").toDate() <= date && 
                date <= moment(booking.endAt).startOf("day").toDate()
            ));
        }

        return true;
    }

    useEffect(() => {
        getBookingsForRental(rental._id).then((bookings) => {
            setBookingsForRental(bookings);
        });
    }, [rental]);

    return <div className="border rounded p-3">
        <form onSubmit={onSubmit}>
            <span>
                <Typography variant="h5" className="d-inline-block">£{rental.dailyPrice}</Typography> per night
            </span>
            <hr />
            <div className="form-group">
                <label htmlFor="dates">Dates:</label>
                <DateRangePicker
                    renderInput={(startProps, endProps) => {
                        startProps.required = true;
                        return <React.Fragment>
                            <TextField {...startProps} />
                            <Box className="mx-1"> to </Box>
                            <TextField {...endProps} />
                        </React.Fragment>;
                    }}
                    InputProps={{
                        required: true
                    }}
                    inputFormat="dd/MM/yyyy"
                    onChange={(dateRange) => {
                        setBookingDateRange(dateRange);
                    }}
                    onError={(e) => {
                        setBookingDateRangeError(e[0] || e[1]);
                    }}
                    value={bookingDateRange}
                    shouldDisableDate={isDateDisabled}/>
            </div>
            <div className="form-group">
                <label htmlFor="guests">Guests:</label>
                <TextField id="guests"
                    type="select"
                    select
                    value={guests}
                    variant="outlined"
                    onChange={(e) => {
                        setGuests(parseInt(e.target.value));
                    }}
                    className="form-control"
                    required
                >
                    {guestOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
            </div>
            <Button variant="contained"
                color="secondary" 
                className="mt-2 form-control font-weight-bold"
                disabled={!isFormValid}
                onClick={() => setConfirmModalShown(true)}
            >
                Reserve your place now
            </Button>
            <Modal open={showConfirmModal}
                onClose={() => setConfirmModalShown(false)}
                >
                <Box css={modalStyle}>
                    <Typography variant="h5" className="text-capitalize">{rental.category} in {rental.city}</Typography>
                    <p>{formatDateString(bookingDateRange[0])} to {formatDateString(bookingDateRange[1])}</p>
                    <hr />
                    <p>Duration: <b>{numDaysSelected}</b> days</p>
                    <p>Price: <b>£{rental.dailyPrice}</b> per day</p>
                    <p>Guests: <b>{guests}</b></p>
                    <p>Total Price: <b>£{numDaysSelected * rental.dailyPrice}</b></p>
                    <p>Do you confirm your booking for the selected days?</p>
                    <hr />
                    <div>
                        <Button variant="contained" className="mr-2" color="secondary" 
                            onClick={(e) => {
                                onSubmit(e);
                                setConfirmModalShown(false);
                            }}>Confirm</Button>
                        <Button variant="contained" 
                            onClick={() => setConfirmModalShown(false)}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
        </form>
    </div>;
}

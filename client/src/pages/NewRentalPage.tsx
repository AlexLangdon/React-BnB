import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormHelperText, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Amenity, ApiError, CreateRentalRequest } from "react-bnb-common";
import { uploadImage } from "store/slices/rentals";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface NewRentalFormData extends Omit<CreateRentalRequest, "image" | "amenities"> {
    image: File;
}

export default function NewRentalPage(): JSX.Element {
	const { register, handleSubmit, errors, control } = useForm();
    const [apiErrors, setApiErrors] = useState<Array<ApiError>>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<Array<Amenity>>([]);
    const history = useHistory();

    const amenities: Array<Amenity> = [
        "Dishwasher",
        "Dryer",
        "Free Breakfast",
        "Free Parking",
        "Fridge Freezer",
        "Heating",
        "Washing Machine",
        "Wifi",
        "Work Area"
    ];
    const selectAmenity = (event: React.ChangeEvent<{ value: unknown; }>) => {
        setSelectedAmenities(event.target.value as Array<Amenity>);
    };

    const onSubmit = (data: NewRentalFormData) => {
        console.log(data, selectedAmenities);

        uploadImage(data.image).then((imageUploadResp) => {
            const createRentalRequest: CreateRentalRequest = {
                ...data,
                amenities,
                image: imageUploadResp
            };

            axios.post("/api/rentals/create", createRentalRequest)
                .then(resp => {
                    history.push("/");
                })
                .catch(error => {
                    console.error(error);
                    const errors = error.response?.data.errors ?? [{
                        title: error.name, 
                        detail: error.message
                    }];
                    setApiErrors(errors);
                });
            }
        ).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="container pt-5">
			<div className="row justify-content-center">
				<form onSubmit={handleSubmit(onSubmit)} className="col-md-6 col-lg-5 mb-4">
                    <Button variant="contained" startIcon={<ArrowBackIosIcon />} href="/">Back</Button>
                    <h2 className="my-4">New Rental</h2>
                    <FormGroup>
                        <div className="my-2">
                            <InputLabel htmlFor="image">Upload Rental Image:</InputLabel>
                            <FormControl className="d-flex w-100" error={!!errors.image}>
                                <Controller
                                    id="image"
                                    name="image"
                                    control={control}
                                    error={!!errors.image}
                                    rules={{ required: "Image is required" }}
                                    as={({ onChange }) => (
                                        <OutlinedInput
                                            inputProps={{
                                                accept: "image/jpeg, image/png, image/jpg"
                                            }}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                onChange(e.target.files?.item(0));
                                            }}
                                            type="file"
                                        />
                                    )}
                                />
                                <FormHelperText className="Mui-error MuiFormHelperText-contained">
                                    {errors.image && errors.image.message}
                                </FormHelperText>
                            </FormControl>
                        </div>
                        <TextField 
                            id="title" 
                            name="title" 
                            label="Title" 
                            type="text"
                            variant="outlined" 
                            className="my-2"
                            error={!!errors.title} 
                            helperText={errors?.title?.message}
                            inputRef={
                                register({
                                    required: "Title is required",
                                    minLength: {
                                        value: 12,
                                        message: "Title must be at least 12 characters"
                                    }
                                })
                            }
                        />
                        <TextField 
                            id="city" 
                            name="city" 
                            label="City" 
                            type="text"
                            variant="outlined" 
                            className="my-2"
                            error={!!errors.city}
                            helperText={errors?.city?.message}
                            inputRef={
                                register({
                                    required: "City is required"
                                })
                            }
                        />
                        <FormControl className="my-2" error={!!errors.category}>
                            <Controller
                                id="category"
                                name="category"
                                control={control}
                                defaultValue=""
                                error={!!errors.category}
                                rules={{ required: "Category is required" }}
                                as={
                                    <TextField
                                        select
                                        variant="outlined"
                                        label="Category"
                                    >
                                        <MenuItem value={"Room"}>Room</MenuItem>
                                        <MenuItem value={"Apartment"}>Apartment</MenuItem>
                                        <MenuItem value={"House"}>House</MenuItem>
                                    </TextField>
                                }
                            />
                            <FormHelperText className="Mui-error MuiFormHelperText-contained">
                                {errors.category && errors.category.message}
                            </FormHelperText>
                        </FormControl>
                        <TextField 
                            id="numRooms" 
                            name="numRooms" 
                            label="Number of Rooms" 
                            type="number"
                            inputProps={{min: 0, max: 10}}
                            variant="outlined" 
                            className="my-2"
                            error={!!errors.numRooms}
                            helperText={errors?.numRooms?.message}
                            inputRef={
                                register({
                                    required: "Number of rooms is required"
                                })
                            }
                        />
                        <TextField 
                            id="description"
                            className="my-2"
                            name="description"
                            label="Description"
                            type="text"
                            variant="outlined"
                            multiline
                            rows={4} 
                            error={!!errors.description}
                            helperText={errors?.description?.message}
                            inputRef={
                                register({
                                    required: "Description is required",
                                    minLength: {
                                        value: 20,
                                        message: "Description must be at least 20 characters"
                                    }
                                })
                            }
                        />
                        <Controller
                            id="shared"
                            name="shared"
                            control={control}
                            defaultValue={false}
                            render={(field) =>
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label="Shared"
                                    className="my-2"
                                />
                            }
                        />
                       <TextField
                            id="dailyPrice"
                            name="dailyPrice"
                            label="Daily Price"
                            type="number"
                            variant="outlined"
                            className="my-2"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">£</InputAdornment>
                                )
                            }}
                            inputProps={{min: 0.01, step: 0.01}}
                            error={!!errors.dailyPrice}
                            helperText={errors?.dailyPrice?.message}
                            inputRef={
                                register({
                                    required: "Daily price is required"
                                })
                            }
                        />
                        <FormControl variant="outlined" className="my-2">
                            <InputLabel id="amenities-label">Amenities</InputLabel>
                            <Select
                                id="amenities"
                                name="amenities"
                                labelId="amenities-label"
                                multiple
                                variant="outlined"
                                value={selectedAmenities}
                                onChange={selectAmenity}
                                input={<OutlinedInput label="Amenities" name="amenities-input" />}
                                renderValue={(selected) => (
                                    <div>
                                        {(selected as string[])?.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </div>
                                )}
                            >
                            {amenities?.map((amenity) => (
                                <MenuItem key={amenity} value={amenity}>
                                    <Checkbox checked={selectedAmenities.includes(amenity)} />
                                    <ListItemText primary={amenity} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                    {apiErrors.map(error => (
                        <div key={error.title} className="alert alert-danger">
                            {error.detail}
                        </div>
                    ))}
                    <Button type="submit" color="primary" variant="contained" className="my-2">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
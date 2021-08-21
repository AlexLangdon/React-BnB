import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormHelperText, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function NewRentalPage(): JSX.Element {
	const { register, handleSubmit, errors, control } = useForm();

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const selectCategory = (event: React.ChangeEvent<{ value: unknown; }>) => {
        setSelectedCategory(event.target.value as string);
    };

    const [shared, setShared] = useState(false);

    const [selectedAmenities, setSelectedAmenities] = useState<Array<string>>([]);
    const amenities = [
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
        setSelectedAmenities(event.target.value as string[]);
    };

    const onSubmit = () => {
        return "";
    };

    return (
        <div className="container pt-5">
			<div className="row justify-content-center">
				<form onSubmit={handleSubmit(onSubmit)} className="col-md-6 col-lg-5 mb-4">
                    <Button variant="contained" startIcon={<ArrowBackIosIcon />} href="/">Back</Button>
                    <h2 className="my-4">New Rental</h2>
                    <FormGroup>
                        <div className="my-2">
                            <InputLabel>Upload Rental Images:</InputLabel>
                            <FormControl error={!!errors.rentalImages}>
                                <Controller
                                    id="rentalImages"
                                    name="rentalImages"
                                    control={control}
                                    rules={{required: "Images required"}}
                                    defaultValue=""
                                    as={
                                        <TextField
                                            type="file"
                                            variant="outlined"
                                            error={!!errors.rentalImages}
                                            inputProps={{
                                                accept:"image/*",
                                                multiple: true
                                            }}
                                        />
                                    }>
                                </Controller>
                                <FormHelperText className="Mui-error MuiFormHelperText-contained">
                                    {errors.rentalImages && errors.rentalImages.message}
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
                                        value={selectedCategory}
                                        onChange={selectCategory}
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
                            id="rooms" 
                            name="rooms" 
                            label="Number of Rooms" 
                            type="number"
                            inputProps={{min: 0, max: 10}}
                            variant="outlined" 
                            className="my-2"
                            error={!!errors.rooms}
                            helperText={errors?.rooms?.message}
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={shared}
                                    onChange={(event) => setShared(event.target.checked as boolean)}
                                    name="Shared"
                                    color="primary"
                                />
                            }
                            label="Shared"
                            className="my-2"
                        />
                       <TextField
                            id="price"
                            type="number"
                            name="price"
                            label="Daily Price"
                            variant="outlined"
                            className="my-2"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                )
                            }}
                            inputProps={{min: 0.01, step: 0.01}}
                            error={!!errors.price}
                            helperText={errors?.price?.message}
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
                                        {(selected as string[]).map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </div>
                                )}
                            >
                            {amenities.map((amenity) => (
                                <MenuItem key={amenity} value={amenity}>
                                    <Checkbox checked={selectedAmenities.includes(amenity)} />
                                    <ListItemText primary={amenity} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <Button type="submit" color="primary" variant="contained" className="my-2">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
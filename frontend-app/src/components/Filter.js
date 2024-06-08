import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const ratings = [1, 2, 3, 4, 5];

const Filter = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        setLocalFilters({
            ...localFilters,
            [e.target.name]: e.target.value
        });
    };

    const handleApplyFilters = () => {
        onFilterChange(localFilters);
    };

    return (
        <div>
            <TextField
                select
                label="Category"
                name="category"
                value={localFilters.category}
                onChange={handleChange}
                margin="normal"
            >
                {categories.map(category => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Company"
                name="company"
                value={localFilters.company}
                onChange={handleChange}
                margin="normal"
            >
                {companies.map(company => (
                    <MenuItem key={company} value={company}>
                        {company}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Rating"
                name="rating"
                value={localFilters.rating}
                onChange={handleChange}
                margin="normal"
            >
                {ratings.map(rating => (
                    <MenuItem key={rating} value={rating}>
                        {rating}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Min Price"
                name="minPrice"
                type="number"
                value={localFilters.minPrice}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                label="Max Price"
                name="maxPrice"
                type="number"
                value={localFilters.maxPrice}
                onChange={handleChange}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                Apply Filters
            </Button>
        </div>
    );
};

export default Filter;
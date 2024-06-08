import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const sortOptions = [
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'discount', label: 'Discount' }
];

const Sort = ({ sort, onSortChange }) => {
    const handleChange = (e) => {
        onSortChange({
            ...sort,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <TextField
                select
                label="Sort By"
                name="sortBy"
                value={sort.sortBy}
                onChange={handleChange}
                margin="normal"
            >
                {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Order"
                name="order"
                value={sort.order}
                onChange={handleChange}
                margin="normal"
            >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
            </TextField>
        </div>
    );
};

export default Sort;
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const handleChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <MuiPagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
    );
};

export default Pagination;
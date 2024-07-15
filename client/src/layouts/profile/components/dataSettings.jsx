import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from '@mui/material';

import VuiButton from 'components/VuiButton';

export const DataDetails = ({ data, onEdit }) => {

    const [formData, setFormData] = useState(data);
    // To show only needed fields
    // const fields = {
    //     firstName: "required",
    //     lastName: "notRequired",
    //     email: "required",
    //     phoneNumber: "required",
    // };

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    
    const handleReset = () => {
        setFormData(data);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        onEdit(formData);
    };

    const generateLabel = (fieldName) => {
        return fieldName
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <Card component="form" autoComplete="off" onSubmit={handleSubmit}>
            <CardHeader
                subheader="The dashboard data can be edited"
                title="Dashboard Data"
                titleTypographyProps={{ variant: 'body1' }}
                subheaderTypographyProps={{ variant: 'body2' }}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={5}>
                    {formData &&
                        Object.keys(formData).map((fieldName) => {
                            if (!fieldName.includes('Array') && !fieldName.includes('_')) {
                                return (
                                    <Grid item xs={12} md={3} key={fieldName}>
                                        <TextField
                                            fullWidth
                                            label={generateLabel(fieldName)}
                                            name={fieldName}
                                            onChange={handleChange}
                                            required
                                            value={formData[fieldName] || ''}
                                            color="info"
                                            type='number'
                                        />
                                    </Grid>
                                );
                            }
                        })}
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <VuiButton color="info" onClick={handleReset}>Reset</VuiButton>
                <VuiButton color="success" type="submit">Save Details</VuiButton>
            </CardActions>
        </Card>
    );
};


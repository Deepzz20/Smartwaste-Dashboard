import React, { useState } from 'react';
import { Card, CardActions, CardContent, Divider, Grid, MenuItem, Modal, TextField } from "@mui/material";

// SmartWaste Dashboard React components
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'black !important',
    border: '2px solid grey',
    boxShadow: 24,
    p: 4,
};

export default function EditModal({ fields, onClose, onSubmit }) {
    const [formFields, setFormFields] = useState(fields);

    const selectOptions = {
        issueType: [
            'Full Bin',
            'Damaged Bin',
            'Missing Bin',
            'Litter Around Bin',
            'Sensor Malfunction',
            'Truck Delay',
            'Driver Related',
            'Other',
        ],
        issueStatus: ['Open', 'In Progress', 'Closed'],
        binSize: ['Small', 'Medium', 'Large'],
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formFields);   // Call the submit logic with existing values
        onClose();
    };

    const generateLabel = (fieldName) => (
        fieldName
            .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
            .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
    );

    const propertiesToSkip = ['__v', 'password', 'pastFillLevels'];


    return (
        <Modal
            open={true}   // Ensure the modal is always open when rendered
            onClose={onClose}
        >
            <Card component="form" autoComplete="off" onSubmit={handleSubmit} sx={style}>
                <VuiTypography variant="h5">
                    Edit Data
                </VuiTypography>

                <Divider />

                <CardContent>
                    <Grid container spacing={3}>

                        {formFields &&
                            Object.keys(formFields)
                                .filter((key) => !propertiesToSkip.includes(key))
                                .map((fieldName, index) => (
                                    <Grid item xs={12} md={6} key={fieldName}>
                                        {index < 2 ? (
                                            <TextField
                                                fullWidth
                                                label={generateLabel(fieldName)}
                                                name={fieldName}
                                                onChange={handleChange}
                                                required
                                                value={formFields[fieldName]}
                                                color="info"
                                                size="small"
                                                disabled
                                            />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                select={selectOptions.hasOwnProperty(fieldName)}
                                                label={generateLabel(fieldName)}
                                                name={fieldName}
                                                onChange={handleChange}
                                                required
                                                value={formFields[fieldName]}
                                                color="info"
                                                size="small"
                                                inputProps={
                                                    fieldName === 'password'
                                                        ? { minLength: 6, title: "Password must be at least 6 characters" }
                                                        : fieldName === 'phoneNumber'
                                                            ? { pattern: "\\d{10}", title: "Phone number must be exactly 10 digits" }
                                                            : fieldName === 'email'
                                                                ? { type: "email", title: "Please enter a valid email address" }
                                                                : {}
                                                }
                                            >
                                                {selectOptions[fieldName] &&
                                                    selectOptions[fieldName].map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        )}
                                    </Grid>
                                ))}


                    </Grid>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <VuiButton color="error" onClick={onClose}>Cancel</VuiButton>
                    <VuiButton color="info" type="submit">Save details</VuiButton>
                </CardActions>
            </Card>
        </Modal>
    );
}

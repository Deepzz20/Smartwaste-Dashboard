import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from '@mui/material';

import VuiButton from 'components/VuiButton';

export const AccountProfileDetails = ({ data, onEdit }) => {
  const [formData, setFormData] = useState(data);
  const fields = {
    firstName: "required",
    lastName: "notRequired",
    email: "required",
    phoneNumber: "required",
  };

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
        subheader="The admin information can be edited"
        title="Admin Profile"
        titleTypographyProps={{ variant: "body1" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={5}>
          {Object.keys(fields).map((fieldName) => (
            <Grid item xs={12} md={6} key={fieldName}>
              <TextField
                fullWidth
                label={generateLabel(fieldName)}
                name={fieldName}
                onChange={handleChange}
                required={fields[fieldName] === "required"}
                value={formData[fieldName] || ''}
                color="info"
                inputProps={
                  fieldName === 'password'
                    ? { minLength: 6, title: "Password must be at least 6 characters" }
                    : fieldName === 'phoneNumber'
                      ? { pattern: "\\d{10}", title: "Phone number must be exactly 10 digits" }
                      : fieldName === 'email'
                        ? { type: "email", title: "Please enter a valid email address" }
                        : {}
                }
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <VuiButton color="info" onClick={handleReset}>Reset</VuiButton>
        <VuiButton color="success" type="submit">Save Details</VuiButton>
      </CardActions>
    </Card>
  );
};

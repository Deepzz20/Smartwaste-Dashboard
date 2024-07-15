import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, Divider, TextField, InputAdornment, IconButton, Grid } from '@mui/material';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import VuiButton from 'components/VuiButton';

export const SettingsPassword = ({ onEdit }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit(formData);
  };

  return (
    <Card component="form" autoComplete="off" onSubmit={handleSubmit} >
      <CardHeader
        subheader="Update password"
        title="Password"
        titleTypographyProps={{ variant: 'body1' }}
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={5}>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              color="info"
              inputProps={{ minLength: 6, title: "Password must be at least 6 characters" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      color={showPassword ? "info" : "white"}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirmPassword"
              onChange={handleChange}
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              color="info"
              inputProps={{ minLength: 6, title: "Password must be at least 6 characters" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      color={showConfirmPassword ? "info" : "white"}
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

            />
          </Grid>

        </Grid>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <VuiButton color="info" onClick={handleReset}>Reset</VuiButton>
        <VuiButton color="success" type="submit">Update Password</VuiButton>
      </CardActions>
    </Card>
  );
};

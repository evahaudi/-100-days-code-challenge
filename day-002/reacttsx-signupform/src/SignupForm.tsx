import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission logic here
      console.log("Form submitted successfully!");
      // You can also send the form data to an API endpoint or perform any other necessary action
    } else {
      console.log("Form validation failed. Please correct errors before submitting.");
    }
  };
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const paperWidth = isSmallScreen ? '300px' : '330px';

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }else if (formData.firstName.length < 4) {
      newErrors.firstName = 'FirstName must be at least 4 characters long';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }else if (formData.lastName.length < 4) {
      newErrors.lastName = 'LastName must be at least 4 characters long';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4} container justifyContent="center">
        <Paper elevation={3} style={{ padding: 20, marginTop: theme.spacing(8), [theme.breakpoints.up('sm')]: { marginTop: theme.spacing(9) }, width: paperWidth,display: 'flex', flexDirection: 'column', backgroundColor: '#F3F6F6', borderRadius: 10 ,alignItems: 'center' }}>
        <LockOutlinedIcon  style={{ fontSize: 20, color:"purple", marginBottom: theme.spacing(2) }} />
        <br/>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">First Name</Typography>
                <TextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Last Name</Typography>
                <TextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Password</Typography>
                <TextField
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      name="rememberMe"
                      color="default"
                    />
                  }
                  label={<Typography variant="body1">Remember Me</Typography>}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="secondary" size="small" fullWidth>
                  Sign Up
                </Button>
                <br />
                <br />
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link href="/login" >
                      Login in here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <Link href="/forgotpwd" >
                    Forgot your password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupForm;

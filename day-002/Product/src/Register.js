import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Link, Checkbox, FormControlLabel,useMediaQuery,useTheme  } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    checkbox:'',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const paperWidth = isSmallScreen ? '300px' : '330px';
  return (
    <Grid container  justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4}  container justifyContent="center">
        <Paper elevation={3} style={{ padding: 20, marginTop: theme.spacing(8), [theme.breakpoints.up('sm')]: { marginTop: theme.spacing(12) } , width: paperWidth,backgroundColor:'#F3F6F6', borderRadius: 10} }>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">First Name</Typography>
                <TextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
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
                <Button type="submit" variant="contained" color="primary" size="small" fullWidth>
                  Sign Up
                </Button>
                <br/>
                <br/>
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

export default Register;

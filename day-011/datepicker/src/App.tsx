import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button, Box, Container, Grid, ThemeProvider, createTheme } from '@mui/material';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

// Define Material-UI themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Change color for light mode
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333333', // Change color for dark mode
    },
  },
});

export default function Example() {
  const [selected, setSelected] = useState<Date>();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Force re-render of DayPicker when theme changes
  useEffect(() => {
    // Trigger a state change to force re-render
    setSelected(selected);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Container maxWidth="sm" style={{ backgroundColor: theme === 'light' ? lightTheme.palette.primary.main : darkTheme.palette.primary.main }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={selected ? <p>You picked {format(selected, 'PP')}.</p> : <p>Please pick a day.</p>}
                style={{ backgroundColor: theme === 'light' ? lightTheme.palette.primary.main : darkTheme.palette.primary.main }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleToggleTheme} style={{ position: 'absolute', top: 10, right: 0 ,marginTop:10}}>
                {theme === 'light' ? < DarkModeOutlinedIcon/> : <LightModeOutlinedIcon />}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

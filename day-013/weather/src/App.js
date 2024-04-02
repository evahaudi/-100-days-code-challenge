import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, CssBaseline, createTheme, ThemeProvider, FormControl, CircularProgress } from '@mui/material';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [themeMode, setThemeMode] = useState('light');

  const API_KEY = 'afb018d00c7ff8c27efbf756ac260853';

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4"  sx={{marginTop:"70px"}} gutterBottom>Weather App</Typography>
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            {themeMode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
        </Box>
        <div className="App">
          
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                label="Enter city"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <Button variant="contained" type="submit" disabled={loading}>Get Weather</Button>
            </FormControl>
          </form>
          {loading && <CircularProgress sx={{ marginTop: 2 }} />}
          {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
          {weatherData && (
            <Box  sx={{ marginTop: 2 }}>
              <Typography variant="h5" sx={{ marginTop: 2 }}>{weatherData.name}, {weatherData.sys.country}</Typography>
              <Typography sx={{ marginTop: 1 }}>Temperature: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{weatherData.main.temp}°C</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Description: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{weatherData.weather[0].description}</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Humidity: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{weatherData.main.humidity}%</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Wind Speed: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{weatherData.wind.speed} m/s</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Visibility:<span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}> {weatherData.visibility} meters</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Sunrise: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Sunset: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Cloudiness: <span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{weatherData.clouds.all}%</span></Typography>
              <Typography sx={{ marginTop: 1 }}>Weather Condition:<span style={{ color: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9' }}>{weatherData.weather[0].main}</span></Typography>
            </Box>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;

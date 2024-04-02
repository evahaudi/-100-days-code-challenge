import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button, Container, Typography, Avatar, Box } from '@mui/material';

function App() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom>React Google Login</Typography>
            <Box mt={4}>
                {profile ? (
                    <Box textAlign="center">
                        <Avatar src={profile.picture} alt="user image" />
                        <Typography variant="h5" mt={2}>User Logged in</Typography>
                        <Typography variant="body1">Name: {profile.name}</Typography>
                        <Typography variant="body1">Email Address: {profile.email}</Typography>
                        <Box mt={4}>
                            <Button variant="contained" color="secondary" onClick={logOut}>Log out</Button>
                        </Box>
                    </Box>
                ) : (
                    <Button variant="contained" color="secondary" onClick={login}>Sign in with Google</Button>
                )}
            </Box>
        </Container>
    );
}

export default App;

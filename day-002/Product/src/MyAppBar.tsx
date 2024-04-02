import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Box, Menu, IconButton, MenuItem, useMediaQuery, CssBaseline, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Contact from './Contact';
import Products from './Products';
import { ColorModeContext } from "./theme";

const MyAppBar: React.FC = () => {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext);
    const [currentPage, setCurrentPage] = useState<string>('/');
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        setMenuAnchor(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const renderPageComponent = () => {
        switch (currentPage) {
            case '/':
                return <Home />;
            case '/register':
                return <Register />;
            case '/login':
                return <Login />;
            case '/contact':
                return <Contact />;
            case '/products':
                return <Products />;

            default:
                return null;
        }
    };

    const appBarBackgroundColor = theme.palette.mode === 'dark' ? '#494B4B' : '#2196F3';

    return (
        <>
            <CssBaseline />
            <AppBar position="static" style={{ backgroundColor: appBarBackgroundColor }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{
                                maxWidth: '5%',
                                maxHeight: '5%',
                                marginRight: '10px',
                            }}
                        />
                    </Box>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuOpen}
                                style={{
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                anchorEl={menuAnchor}
                                open={Boolean(menuAnchor)}
                                onClose={handleMenuClose}
                                PaperProps={{ style: { backgroundColor: '#009AC7 ' } }}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/"
                                    onClick={() => handlePageChange('/')}
                                    style={{
                                        color: "white",
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Home
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/register"
                                    onClick={() => handlePageChange('/register')}
                                    style={{
                                        color: "white",
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Register
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/login"
                                    onClick={() => handlePageChange('/login')}
                                    style={{
                                        color: "white",
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Sign In
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/contact"
                                    onClick={() => handlePageChange('/contact')}
                                    style={{
                                        color: "white",
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Contact Us
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/products"
                                    onClick={() => handlePageChange('/products')}
                                    style={{
                                        color: "white",
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Products
                                </MenuItem>
                                <IconButton onClick={colorMode.toggleColorMode}>
                                    {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                                </IconButton>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                color="inherit"
                                component={Link}
                                to="/"
                                onClick={() => handlePageChange('/')}
                                style={{
                                    backgroundColor: currentPage === '/' ? 'orange' : 'inherit',
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                }}
                            >
                                Home
                            </MenuItem>
                            <MenuItem
                                color="inherit"
                                component={Link}
                                to="/register"
                                onClick={() => handlePageChange('/register')}
                                style={{
                                    backgroundColor: currentPage === '/register' ? 'orange' : 'inherit',
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                }}
                            >
                                Register
                            </MenuItem>
                            <MenuItem
                                color="inherit"
                                component={Link}
                                to="/login"
                                onClick={() => handlePageChange('/login')}
                                style={{
                                    backgroundColor: currentPage === '/login' ? 'orange' : 'inherit',
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                }}
                            >
                                Sign In
                            </MenuItem>
                            <MenuItem
                                color="inherit"
                                component={Link}
                                to="/contact"
                                onClick={() => handlePageChange('/contact')}
                                style={{
                                    backgroundColor: currentPage === '/contact' ? 'orange' : 'inherit',
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                }}
                            >
                                Contact Us
                            </MenuItem>
                            <MenuItem
                                color="inherit"
                                component={Link}
                                to="/products"
                                onClick={() => handlePageChange('/products')}
                                style={{
                                    backgroundColor: currentPage === '/products' ? 'orange' : 'inherit',
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                }}
                            >
                                Products
                            </MenuItem>
                            <IconButton onClick={colorMode.toggleColorMode}>
                                {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon style={{ color: 'white' }} />}
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {renderPageComponent()}
        </>
    );
};

export default MyAppBar;

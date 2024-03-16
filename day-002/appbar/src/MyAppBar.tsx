import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, MenuItem, Menu, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';
import MenuIcon from '@mui/icons-material/Menu';

const MyAppBar: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>('/');
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMobile: boolean = useMediaQuery('(max-width:600px)');

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        setMenuAnchor(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#333333' }}>
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
                            PaperProps={{ style: { backgroundColor: '#666666' } }}
                        >
                            <MenuItem
                                component={Link}
                                to="/"
                                onClick={() => handlePageChange('/')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                }}
                            >
                                Home
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/register"
                                onClick={() => handlePageChange('/register')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                }}
                            >
                                Register
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/login"
                                onClick={() => handlePageChange('/login')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                }}
                            >
                                Sign In
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/contact"
                                onClick={() => handlePageChange('/contact')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                }}
                            >
                                Contact Us
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/about"
                                onClick={() => handlePageChange('/about')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                }}
                            >
                                About Us
                            </MenuItem>
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
                                backgroundColor: currentPage === '/' ? '#00e600' : 'inherit',
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
                                backgroundColor: currentPage === '/register' ? '#00e600' : 'inherit',
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
                                backgroundColor: currentPage === '/login' ? '#00e600' : 'inherit',
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
                                backgroundColor: currentPage === '/contact' ? '#00e600' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            Contact Us
                        </MenuItem>
                        <MenuItem
                            color="inherit"
                            component={Link}
                            to="/about"
                            onClick={() => handlePageChange('/about')}
                            style={{
                                backgroundColor: currentPage === '/about' ? '#00e600' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            About Us
                        </MenuItem>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;

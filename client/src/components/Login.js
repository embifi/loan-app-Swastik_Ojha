// client/src/components/Login.js
import { Box, Button, Grid, TextField, } from '@mui/material';
import React, { useState } from 'react';

const Login = ({ setLoggedIn, setToken }) => {


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a POST request to the backend API (/api/login) with user credentials
        fetch('http://localhost:6969/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed');
                }
            })
            .then((data) => {
                if (data?.token) {
                    // Save token to local storage
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setLoggedIn(true);
                }
            })
            .catch((error) => console.error('Error logging in:', error));
    };

    return (<Box sx={{ justifyContent: "center" }}>
        <Grid height={"200px"} backgroundColor="#8800ff">
        </Grid>
        <Grid sx={{
            marginInline: "10%",
            height: "20rem",
            position: "relative", top: "-55px",
            display: "flex", flexDirection: "row", backgroundColor: "#fff",
            justifyContent: "space-between", border: "1px solid", width: "80%"
        }}>
            <Grid sx={{ width: "65%", }}>
                <img alt="img."
                    height={320} width={"100%"}
                    src="https://i0.wp.com/gigoloindiapvt.com/wp-content/uploads/2020/07/csh-login.png" />
            </Grid>
            <Grid sx={{
                width: "35%"
            }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column", rowGap: 5
                        , paddingInline: 1
                    }}>
                        <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                            <label htmlFor="email">Email:</label>
                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                size='small'
                                placeholder='enter Email'
                            />
                        </Grid>
                        <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <label htmlFor="password">Password:</label>
                            <TextField

                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required

                                size='small'
                                placeholder='enter Password' />
                        </Grid>
                        <Button sx={{ alignSelf: "center" }} variant='contained' type="submit">Login</Button>
                    </Grid> </form>
            </Grid >

        </Grid >
    </Box>
    );
};

export default Login;

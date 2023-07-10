import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';

// Define the type for the props received by the LoginPage component
type TLoginPage = {
	values: Record<string, unknown>;
	errors: any;
	isSubmitting: boolean;
	handleChange: () => void;
	handleBlur: () => void;
	handleSubmit: () => void;
};

// Define the LoginPage component
const LoginPage = (props: TLoginPage) => {
	// Define the state variable 'credentials' and a function to update it using the 'useState' hook
	const [credentials, setCredentials] = useState<Record<string, unknown>>({
		username: '',
		password: '',
	});

	// Define the 'handleChange' function to update the state when input values change
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		// Update the 'credentials' state by merging the previous state with the new value
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: value,
		}));
	};

	// Define the 'handleSubmit' function to handle form submission
	const handleSubmit = () => {
		console.log('username', credentials.username);
		console.log('password', credentials.password);
	};

	// Render the login form using Material-UI components
	return (
		<Container maxWidth="sm" className="mt-20">
			<form action="submit">
				<Grid container spacing={3} direction="column" alignItems="center">
					<Grid item>
						<h1 className="text-3xl">Login</h1>
					</Grid>
					<Grid item>
						{/* Render a text field for the username */}
						<TextField
							name="username"
							label="Username"
							variant="outlined"
							value={credentials?.username}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						{/* Render a text field for the password */}
						<TextField
							name="password"
							type="password"
							label="Password"
							variant="outlined"
							value={credentials?.password}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						{/* Render a button to submit the form */}
						<Button variant="contained" color="primary" onClick={handleSubmit}>
							Login
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default LoginPage;

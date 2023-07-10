import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import * as Yup from 'yup';

// Define the type for the props received by the LoginPage component
type TLoginPage = {
	values: Record<string, unknown>;
	errors: Record<string, unknown>;
	isSubmitting: boolean;
	handleChange: () => void;
	handleSubmit: () => void;
};
const validationSchema = Yup.object({
	username: Yup.string().required('Username is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});

// Define the LoginPage component
const LoginPage = (props: TLoginPage) => {
	// Define the state variable 'credentials' and a function to update it using the 'useState' hook
	const [credentials, setCredentials] = useState<Record<string, unknown>>({
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		passwordLengthError: false,
		userNotInsertedError: false,
		wrongUserError: false,
		wrongPasswordError: false,
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
	const handleSubmit = async () => {
		try {
			await validationSchema.validate(credentials, { abortEarly: false });
			setErrors({
				passwordLengthError: false,
				userNotInsertedError: false,
				wrongUserError: false,
				wrongPasswordError: false,
			});
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				setErrors({
					passwordLengthError: false,
					userNotInsertedError: false,
					wrongUserError: false,
					wrongPasswordError: false,
				});
				error.inner.forEach((validationError) => {
					if (
						validationError.path === 'password' &&
						validationError.type === 'min'
					) {
						setErrors((prevErrors) => ({
							...prevErrors,
							passwordLengthError: true,
						}));
					}
					if (
						validationError.path === 'username' &&
						validationError.type === 'required'
					) {
						setErrors((prevErrors) => ({
							...prevErrors,
							userNotInsertedError: true,
						}));
					}
					// Gestisci gli altri tipi di errore in base alle tue esigenze
				});
			}
			console.log('Validation error:', error);
		}
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
							error={errors.userNotInsertedError || errors.wrongUserError}
							helperText={
								errors.userNotInsertedError
									? 'Username is required'
									: errors.wrongUserError
									? 'Wrong username'
									: ''
							}
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
							error={errors.passwordLengthError || errors.wrongPasswordError}
							helperText={
								errors.passwordLengthError
									? 'Password must be at least 6'
									: errors.wrongPasswordError
									? 'Wrong password'
									: ''
							}
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

import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type TSignupPage = {
	values: Record<string, unknown>;
	errors: Record<string, unknown>;
	isSubmitting: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
};

const validationSchema = Yup.object({
	username: Yup.string().required('Username is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
});

const SignupPage = (props: TSignupPage) => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState<Record<string, unknown>>({
		username: '',
		password: '',
		email: '',
	});

	const [errors, setErrors] = useState({
		passwordLengthError: false,
		userNotInsertedError: false,
		wrongUserError: false,
		wrongPasswordError: false,
		emailError: false,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		try {
			await validationSchema.validate(credentials, { abortEarly: false });

			setErrors({
				passwordLengthError: false,
				userNotInsertedError: false,
				wrongUserError: false,
				wrongPasswordError: false,
				emailError: false,
			});

			// Send data to server
			const response = await axios.post('/api/signup', credentials);

			if (response.status === 200) {
				// Registration successful, redirect to login page
				navigate('/login');
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				setErrors({
					passwordLengthError: false,
					userNotInsertedError: false,
					wrongUserError: false,
					wrongPasswordError: false,
					emailError: false,
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

					if (validationError.path === 'email') {
						setErrors((prevErrors) => ({
							...prevErrors,
							emailError: true,
						}));
					}
				});
			}

			console.log('Validation error:', error);
		}
	};

	return (
		<Container maxWidth="sm" className="mt-20">
			<form>
				<Grid container spacing={3} direction="column" alignItems="center">
					<Grid item>
						<h1 className="text-3xl">Sign Up</h1>
					</Grid>
					<Grid item>
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
									? 'Username already in use!'
									: ''
							}
						/>
					</Grid>
					<Grid item>
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
									? 'Password must contain specials!'
									: ''
							}
						/>
					</Grid>
					<Grid item>
						<TextField
							name="email"
							type="email"
							label="Email"
							variant="outlined"
							value={credentials?.email}
							onChange={handleChange}
							error={errors.emailError}
							helperText={errors.emailError ? 'Invalid email address' : ''}
						/>
					</Grid>
					<Grid item>
						<Button variant="contained" color="primary" onClick={handleSubmit}>
							Sign Up
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default SignupPage;

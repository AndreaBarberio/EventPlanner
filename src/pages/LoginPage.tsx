import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Define the type for the props received by the LoginPage component
type TLoginPage = {
	values: Record<string, unknown>;
	errors: Record<string, unknown>;
	isSubmitting: boolean;
	handleChange: () => void;
	handleSubmit: () => void;
};
const validationSchema = Yup.object({
	email: Yup.string().required('email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});
// Define the LoginPage component
const LoginPage = (props: TLoginPage) => {
	// Define the state variable 'credentials' and a function to update it using the 'useState' hook
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState<Record<string, unknown>>({
		email: '',
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
			// Esegui la validazione utilizzando lo schema di validazione
			await validationSchema.validate(credentials, { abortEarly: false });
			const resp = await axios.post(
				'http://127.0.0.1:3001/api/v1/user/login',
				credentials
			);
			console.log('Resp: ', resp);

			if (resp?.status === 200) {
				// Nessun errore di validazione, reimposta tutti gli errori a false
				setErrors({
					passwordLengthError: false,
					userNotInsertedError: false,
					wrongUserError: false,
					wrongPasswordError: false,
				});
				navigate('/');
			} else {
				setErrors({
					passwordLengthError: false,
					userNotInsertedError: false,
					wrongUserError: false,
					wrongPasswordError: false,
				});
			}
		} catch (error) {
			// gestione dell'errore di validazione
			if (error instanceof Yup.ValidationError) {
				// Reimposta tutti gli errori a false per pulire gli errori precedenti
				setErrors({
					passwordLengthError: false,
					userNotInsertedError: false,
					wrongUserError: false,
					wrongPasswordError: false,
				});

				// Scorre gli errori di validazione interni ciclando error.inner
				error.inner.forEach((validationError) => {
					// Verifica se l'errore riguarda la lunghezza della password
					if (
						validationError.path === 'password' &&
						validationError.type === 'min'
					) {
						// Imposta l'errore sulla lunghezza della password a true
						setErrors((prevErrors) => ({
							...prevErrors,
							passwordLengthError: true,
						}));
					}

					// Verifica se l'errore riguarda l'utente non inserito
					if (
						validationError.path === 'email' &&
						validationError.type === 'required'
					) {
						// Imposta l'errore sull'utente non inserito a true
						setErrors((prevErrors) => ({
							...prevErrors,
							userNotInsertedError: true,
						}));
					}
				});
			}

			// Stampa l'errore di validazione nella console
			console.log('Validation error:', error);
		}
	};

	return (
		<Container maxWidth="sm" className="w-full h-full my-4">
			<form action="submit">
				<Grid container spacing={4} direction="column" alignItems="center">
					<Grid item>
						<h1 className="text-3xl">Login</h1>
					</Grid>
					<Grid item>
						{/* Render a text field for the email */}
						<TextField
							name="email"
							label="email"
							variant="outlined"
							value={credentials?.email}
							onChange={handleChange}
							error={errors.userNotInsertedError || errors.wrongUserError}
							helperText={
								errors.userNotInsertedError
									? 'email is required'
									: errors.wrongUserError
									? 'Wrong email'
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
					<Grid item>
						<small className="text-blue-400">
							Do not have an account yet?
							<Link className="text-blue-500 ml-1" to="/sign-up">
								Register Here
							</Link>
						</small>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default LoginPage;

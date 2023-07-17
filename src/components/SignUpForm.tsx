import React, { useState } from 'react';
import { TextField, Button, Stack, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
	firstName: Yup.string().required('First Name is required'),
	lastName: Yup.string().required('Last Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	// dateOfBirth: Yup.date().required('Date of Birth is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		// dateOfBirth: '',
		password: '',
	});
	type FormErrors = {
		[key: string]: boolean;
	};
	const [errors, setErrors] = useState<FormErrors>({
		firstName: false,
		lastName: false,
		email: false,
		// dateOfBirth: false,
		password: false,
	});

	const navigate = useNavigate();

	async function handleSubmit(event: any) {
		event.preventDefault();

		try {
			await validationSchema.validate(formData, { abortEarly: false });

			const resp = await axios.post(
				'http://127.0.0.1:3001/api/v1/user/signup',
				formData
			);

			console.log('Resp: ', resp);

			if (resp?.status === 200) {
				setErrors({
					firstName: false,
					lastName: false,
					email: false,
					// dateOfBirth: false,
					password: false,
				});
				navigate('/');
			} else {
				console.log('resp', resp.status);
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const newErrors: FormErrors = { ...errors };

				error.inner.forEach((validationError) => {
					const { path } = validationError;

					if (path) {
						newErrors[path] = true;
					}
				});

				setErrors(newErrors);
			}

			console.log('Validation error:', error);
		}
	}
	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: false,
		}));
	};

	return (
		<Grid container direction="column" alignItems="center" className="my-8">
			<form
				className="flex self-center flex-col w-[220px] h-[320px]"
				onSubmit={handleSubmit}
			>
				<Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
					<TextField
						type="text"
						variant="outlined"
						color="secondary"
						label="First Name"
						onChange={handleChange}
						value={formData.firstName}
						name="firstName"
						fullWidth
						required
						error={errors.firstName}
						helperText={errors.firstName ? 'First Name is required' : ''}
					/>
					<TextField
						type="text"
						variant="outlined"
						color="secondary"
						label="Last Name"
						onChange={handleChange}
						value={formData.lastName}
						name="lastName"
						fullWidth
						required
						error={errors.lastName}
						helperText={errors.lastName ? 'Last Name is required' : ''}
					/>
				</Stack>
				<Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
					<TextField
						type="email"
						variant="outlined"
						color="secondary"
						label="Email"
						onChange={handleChange}
						value={formData.email}
						name="email"
						fullWidth
						required
						error={errors.email}
						helperText={errors.email ? 'Invalid email' : ''}
					/>
					<TextField
						type="password"
						variant="outlined"
						color="secondary"
						label="Password"
						onChange={handleChange}
						value={formData.password}
						name="password"
						required
						fullWidth
						sx={{ mb: 4 }}
						error={errors.password}
						helperText={errors.password ? 'Password is required' : ''}
					/>
				</Stack>
				{/* <DatePicker
					label="Birthday"
					onChange={handleChange}
					value={formData.dateOfBirth}
					className="!mb-4"
					name="dateOfBirth"
					// error={errors.dateOfBirth}
					// helperText={errors.dateOfBirth ? 'Date of Birth is required' : ''}
				/> */}
				<Button variant="outlined" color="secondary" type="submit">
					Register
				</Button>
			</form>
			<small className="text-blue-400">
				Already have an account?
				<Link className="text-blue-500" to="/login-page">
					Login Here
				</Link>
			</small>
		</Grid>
	);
};

export default SignUpForm;

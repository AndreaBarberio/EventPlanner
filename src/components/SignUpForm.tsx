import React, { useState } from 'react';
import { TextField, Button, Stack, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const signUpForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event: any) {
		event.preventDefault();
		console.log(firstName, lastName, email, dateOfBirth, password);
	}
	return (
		<Grid container direction="column" alignItems="center" className="my-8">
			<form
				className="flex self-center flex-col w-[220px] h-[320px]"
				onSubmit={handleSubmit}
				action={(<Link to="/login-page" />) as unknown as string}
			>
				<Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
					<TextField
						type="text"
						variant="outlined"
						color="secondary"
						label="First Name"
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
						fullWidth
						required
					/>
					<TextField
						type="text"
						variant="outlined"
						color="secondary"
						label="Last Name"
						onChange={(e: any) => setLastName(e.target.value)}
						value={lastName}
						fullWidth
						required
					/>
				</Stack>
				<Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
					<TextField
						type="email"
						variant="outlined"
						color="secondary"
						label="Email"
						onChange={(e: any) => setEmail(e.target.value)}
						value={email}
						fullWidth
						required
					/>
					<TextField
						type="password"
						variant="outlined"
						color="secondary"
						label="Password"
						onChange={(e: any) => setPassword(e.target.value)}
						value={password}
						required
						fullWidth
						sx={{ mb: 4 }}
					/>{' '}
				</Stack>
				<DatePicker
					label="Birthday"
					onChange={(e: any) => setDateOfBirth(e.target.value)}
					value={dateOfBirth}
					className="!mb-4"
				/>
				<Button variant="outlined" color="secondary" type="submit">
					Register
				</Button>
			</form>
			<small className="text-blue-400">
				Already have an account?{' '}
				<Link className="text-blue-500" to="/login-page">
					Login Here
				</Link>
			</small>{' '}
		</Grid>
	);
};
export default signUpForm;

import React, { useState } from 'react';
import { TextField, Button, Stack, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const RegisterForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState();
	const [password, setPassword] = useState('');

	function handleSubmit(event: any) {
		event.preventDefault();
		console.log(firstName, lastName, email, dateOfBirth, password);
	}

	return (
		<>
			<Container className="w-fit h-fit">
				<h2>Register Form</h2>
				<form
					onSubmit={handleSubmit}
					action={(<Link to="/login-page" />) as unknown as string}
				>
					<Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
					<TextField
						type="email"
						variant="outlined"
						color="secondary"
						label="Email"
						onChange={(e: any) => setEmail(e.target.value)}
						value={email}
						fullWidth
						required
						sx={{ mb: 4 }}
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
					/>
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
				</small>
			</Container>
		</>
	);
};

export default RegisterForm;

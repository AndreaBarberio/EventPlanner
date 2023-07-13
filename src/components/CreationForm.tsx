import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
	TextField,
	Button,
	Stack,
	Container,
	MenuItem,
	InputLabel,
	Select,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const eventTypes: string[] = [
	'Tempo libero',
	'Sport',
	'Lavoro',
	'Passione',
	'Amore',
];

interface FormData {
	type: string;
	eventKeeper: string;
	email: string;
	eventDate: Record<string, unknown> | null;
	guests: string;
}

const RegisterForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		type: '',
		eventKeeper: '',
		email: '',
		eventDate: null,
		guests: '',
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleDateChange = (date: any) => {
		setFormData((prevData) => ({
			...prevData,
			eventDate: date,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(formData);
	};

	return (
		<>
			<Container className="!w-[320px] h-fit">
				<form
					onSubmit={handleSubmit}
					action={(<Link to="/login-page" />) as unknown as string}
					// className="mx-auto max-w-md p-4"
				>
					<Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
						<TextField
							variant="outlined"
							color="secondary"
							label="Type"
							name="type"
							onChange={handleChange}
							value={formData.type}
							fullWidth
							required
							select
							// SelectProps={{
							// 	MenuProps: {
							// 		anchorOrigin: {
							// 			vertical: 'bottom',
							// 			horizontal: 'left',
							// 		},
							// 		transformOrigin: {
							// 			vertical: 'top',
							// 			horizontal: 'left',
							// 		},
							// 		PaperProps: {
							// 			sx: {
							// 				maxHeight: '60px', // Imposta l'altezza massima desiderata
							// 				maxWidth: '80px', // Imposta l'altezza massima desiderata
							// 			},
							// 		},
							// 	},
							// }}
						>
							{eventTypes.map((eventType) => (
								<MenuItem
									key={eventType}
									value={eventType}
									sx={{
										fontSize: '14px', // Imposta la dimensione del font desiderata
										minHeight: 'auto', // Imposta l'altezza minima desiderata
									}}
								>
									{eventType}
								</MenuItem>
							))}
						</TextField>

						<TextField
							type="text"
							variant="outlined"
							color="secondary"
							label="Last Name"
							name="eventKeeper"
							onChange={handleChange}
							value={formData.eventKeeper}
							fullWidth
							required
						/>
					</Stack>
					<TextField
						type="email"
						variant="outlined"
						color="secondary"
						label="Email"
						name="email"
						onChange={handleChange}
						value={formData.email}
						fullWidth
						required
						sx={{ marginBottom: 4 }}
					/>
					<TextField
						type="guests"
						variant="outlined"
						color="secondary"
						label="Guests"
						name="guests"
						onChange={handleChange}
						value={formData.guests}
						required
						fullWidth
						sx={{ marginBottom: 4 }}
					/>
					<DatePicker
						label="Birthday"
						onChange={(date) => handleDateChange(date)}
						value={formData.eventDate}
						className="mb-4"
					/>
					<Button variant="outlined" color="secondary" type="submit">
						Create event!
					</Button>
				</form>
			</Container>
		</>
	);
};

export default RegisterForm;

import React from 'react';
import './output.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import CreateEventPage from './pages/CreateEventPage';
function App({ args }: Record<string, any>) {
	return (
		<Routes>
			<Route path="/" element={<Home {...args} />} />
			<Route path="/login-page" element={<LoginPage {...args} />} />
			<Route path="/sign-up" element={<SignUpPage {...args} />} />
			<Route path="/create-event" element={<CreateEventPage {...args} />} />
		</Routes>
	);
}

export default App;

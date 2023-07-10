import React from 'react';
import './output.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
function App({ args }: any) {
	return (
		<Routes>
			<Route path="/" element={<LoginPage {...args} />} />
		</Routes>
	);
}

export default App;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { twMerge } from 'tailwind-merge';

interface INavbarProps {
	className?: string;
}

const Navbar = ({ className }: INavbarProps) => {
	const navItems = [
		{ label: 'Home', key: '/' },
		{ label: 'Login', key: 'login-page' },
		{ label: 'Sign up', key: 'sign-up' },
		{ label: 'Sign out', key: 'sign-out' },
	];

	const itemStyle =
		'cursor-pointer hover:text-[#9d85d1] flex transition ease-in-out delay-150 p-2 whitespace-nowrap';

	const router = useNavigate();

	return (
		<AppBar
			position="static"
			className={twMerge('bg-blue-500 text-white shadow-xl', className)}
		>
			<Toolbar>
				<div className="flex items-center justify-between w-full sm:w-auto">
					<div className="flex">
						{navItems.map((item) => (
							<Button
								key={item.key}
								onClick={() => router(item.key)}
								className={twMerge(itemStyle, className)}
								color="inherit"
							>
								{item.label}
							</Button>
						))}
					</div>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

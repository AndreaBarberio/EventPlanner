import React from 'react';
import { useNavigate } from 'react-router-dom';
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
		'cursor-pointer hover:text-[#9d85d1] flex transition ease-in-out delay-150 p-2';
	const router = useNavigate();
	return (
		<>
			<ul
				data-testid={'nav-test'}
				className="flex bg-blue-500 text-white shadow-xl whitespace-nowrap h-12 w-auto m-2 rounded-md justify-around items-center"
			>
				<div className="flex flex-start w-full items-center justify-between ml-6">
					{navItems.map((item) => (
						<li
							key={item.key}
							onClick={() => router(item.key)}
							className={twMerge(
								className ? `${itemStyle} ${className}` : itemStyle
							)}
						>
							{item.label}
						</li>
					))}
				</div>
				<div className="w-full flex-shrink"></div>
			</ul>
		</>
	);
};

export default Navbar;

import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaRedditAlien,
	FaDiscord,
	FaMediumM,
} from 'react-icons/fa';

interface IFooterProps {
	className?: string;
}

const itemStyle = 'flex flex-row h-40 justify-between w-full bg-blue-300';
const socialIcons = [
	{ label: 'Facebook', icon: <FaFacebookF /> },
	{ label: 'Twitter', icon: <FaTwitter /> },
	{ label: 'Instagram', icon: <FaInstagram /> },
	{ label: 'LinkedIn', icon: <FaLinkedinIn /> },
	{ label: 'Reddit', icon: <FaRedditAlien /> },
	{ label: 'Discord', icon: <FaDiscord /> },
	{ label: 'Medium', icon: <FaMediumM /> },
];
const footerItems = [
	{ label: 'About us' },
	{ label: 'Services' },
	{ label: 'Newsletter' },
	{ label: 'Contact' },
	{ label: 'FAQ' },
	{ label: 'Terms and Conditions' },
	{ label: 'Privacy Policy' },
];
const Footer = ({ className }: IFooterProps) => {
	return (
		<div
			className={twMerge(className ? `${itemStyle} ${className}` : itemStyle)}
		>
			<div className="flex flex-col md:flex-row">
				<div className="grid grid-cols-2 p-2 text-center sm:text-start">
					{footerItems?.map((item, i) => (
						<div
							className="h-4 m-2 flex flex-col text-white cursor-pointer"
							key={i}
						>
							{item.label}
						</div>
					))}
				</div>
				<div className="flex flex-row md:ml-auto p-8 bg-blue-300">
					{socialIcons.map((social, i) => (
						<div
							className="text-white h-8 m-2 flex self-center hover:text-gray-300 cursor-pointer"
							key={i}
						>
							{social.icon}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Footer;

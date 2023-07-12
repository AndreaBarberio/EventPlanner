import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

type TLayoutProps = {
	children: JSX.Element;
};

export default function Layout({ children }: TLayoutProps) {
	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="p-4">{children}</div>
			<Footer className="" />
		</div>
	);
}

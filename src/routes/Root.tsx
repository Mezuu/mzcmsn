import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function Root() {
	return (
		<main className={['bg-cmsn-black'].join(" ")}>
			<Header />
			<Outlet />
		</main>
	);
}

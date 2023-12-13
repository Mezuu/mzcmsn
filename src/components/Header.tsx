import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { CmsnLink } from './Link';

export function Header() {
	return (
		<div className="py-6 w-full mb-8">
			<div className="flex justify-between px-36">
				<h1 className="text-cmsn-white text-xl text-center font-bold">
					Mezuu's Commission
				</h1>
				<ul className="flex gap-6">
					<li>
						<CmsnLink to={'/'}>
							<FaHome />
							<span>Home</span>
						</CmsnLink>
					</li>
					<li>
						<CmsnLink to={'/order'}>
							<FaShoppingCart />
							<span>Order Now</span>
						</CmsnLink>
					</li>
				</ul>
			</div>
		</div>
	);
}

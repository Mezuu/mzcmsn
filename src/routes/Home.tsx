import { FaImage } from 'react-icons/fa';
import { Card } from '../components/Card';
import { Hero } from '../components/Hero';
import data from '../data/latestcommission.json';
import { format } from 'date-fns';

export function Home() {
	return (
		<div className="flex flex-col w-screen">
			<Hero />
			<div className="px-36 flex flex-col gap-4">
				<div className="text-cmsn-white text-2xl flex gap-2 items-center">
					<FaImage />
					<strong>Latest Commissions</strong>
				</div>

				<div className="flex gap-8 columns-5">
					{data.latestCommissions.map((commission) => {
						const formattedTime = format(
							new Date(commission.createdAt),
							'dd MMMM yyyy'
						);
						return (
							<Card
								time={formattedTime}
								title={commission.title}
								description={commission.description}
								image={commission.image}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

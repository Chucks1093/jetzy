import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Camera } from 'lucide-react';

const PhotoSpots = () => {
	const photoSpotsData = [
		{
			id: 1,
			title: 'Fountain Area',
			description:
				'The central fountain, with its dynamic water display, provides a captivating foreground with the historic buildings of Lagos State in the backdrop.',
		},
		{
			id: 2,
			title: 'Garden Terrace',
			description:
				'Lush green gardens with vibrant flowers create perfect natural frames for portrait photography and scenic landscape shots.',
		},
		{
			id: 3,
			title: 'Historic Clock Tower',
			description:
				'The iconic clock tower stands majestically against the skyline, offering dramatic architectural photography opportunities during golden hour.',
		},
		{
			id: 4,
			title: 'Waterfront Promenade',
			description:
				'Stunning views of the Lagos lagoon with boats and yachts create perfect sunset photography with reflections dancing on the water.',
		},
	];

	interface PhotoSpotItemProps {
		title: string;
		description: string;
	}

	const PhotoSpotItem: React.FC<PhotoSpotItemProps> = ({
		title,
		description,
	}) => {
		return (
			<div className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
				<div>
					<Camera fill="gray" stroke="white" className="w-5 h-5" />
				</div>
				<div>
					<h1 className="font-manrope font-semibold text-zinc-700 text-md mb-2">
						{title}
					</h1>
					<p className="text-gray-500 text-xs italic">{description}</p>
				</div>
			</div>
		);
	};
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue="item-1"
			className="mt-4 px-3"
		>
			<AccordionItem value="item-1">
				<AccordionTrigger className="  py-3 border-b hover:bg-gray-100 px-3 rounded-lg">
					<p className="flex items-center gap-1 text-zinc-500 text-lg">
						Photo Spots
					</p>
				</AccordionTrigger>
				<AccordionContent>
					{photoSpotsData.map(spot => (
						<PhotoSpotItem
							key={spot.id}
							title={spot.title}
							description={spot.description}
						/>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default PhotoSpots;

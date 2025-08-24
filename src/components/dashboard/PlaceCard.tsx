import { Plus, Bookmark, Star, Sparkles } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { placesData } from '@/data/places.data';
import Autoplay from 'embla-carousel-autoplay';

// PlaceCard Component
type Place = {
	id: string;
	name: string;
	rating: number;
	reviews: string;
	image: string;
	status: string;
	statusColor: string;
	section: string;
};

type PlaceCardProps = {
	place: Place;
	className?: string;
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, ...props }) => {
	return (
		<article
			className={cn(
				'bg-white p-2 rounded-2xl overflow-hidden shadow-sm border border-gray-100',
				props.className
			)}
		>
			{/* Image Container with Overlay Elements */}
			<div className="relative">
				<img
					src={place.image}
					alt={place.name}
					className="w-full h-[12rem] object-cover rounded-lg"
				/>

				{/* Add Button */}
				<button className="absolute top-3 right-3 bg-yellow-400 hover:bg-yellow-500 rounded-full px-3 py-1.5 flex items-center gap-1 text-sm font-medium shadow-sm transition-colors">
					<Plus className="w-4 h-4" />
					<span>Add</span>
				</button>

				{/* Open Status */}
				<div className="absolute bottom-3 left-3 flex items-center gap-2 bg-zinc/20 backdrop-blur-md rounded-full px-3 py-1">
					<span
						className={`w-3 h-3 ${place.statusColor} block rounded-full border-2 border-gray-400`}
					/>
					<p className="text-gray-200 text-xs font-medium">
						{place.status}
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className="p-4">
				{/* Place Name and Bookmark */}
				<div className="flex items-start justify-between mb-2">
					<h1 className="text-lg font-semibold text-gray-900 text-ellipsis w-full overflow-hidden whitespace-nowrap">
						{place.name}
					</h1>

					<button className="text-gray-400 hover:text-yellow-500 transition-colors">
						<Bookmark className="w-5 h-5" />
					</button>
				</div>

				{/* Rating and Details */}
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<div className="flex items-center gap-1">
						<span className="font-medium text-gray-900">
							{place.rating}
						</span>
						<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
					</div>
					<span>({place.reviews})</span>
					<span>$$</span>
				</div>
			</div>
		</article>
	);
};

// Main PlacesCarousel Component
type PlacesCarouselProps = {
	className?: string;
};

const PlacesCarousel: React.FC<PlacesCarouselProps> = props => {
	return (
		<div className={cn('py-3 px-4 w-full mx-auto', props.className)}>
			<div className="flex items-center gap-2 mb-4  bg-white w-fit px-3 py-1 rounded-xl text-blue-700">
				<Sparkles className="w-5 " />
				<p className="text-sm font-medium">AI Recommendations</p>
			</div>
			<Carousel
				opts={{
					align: 'start',
					loop: true,
				}}
				plugins={[
					Autoplay({
						delay: 4000,
					}),
				]}
				className="w-full"
			>
				<CarouselContent className="-ml-2 md:-ml-4">
					{placesData.map((item, index) => (
						<CarouselItem
							key={index}
							className="pl-2 md:pl-4 md:basis-[37%] basis-[80%]"
						>
							<PlaceCard place={item} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="-left-2 size-12" />
				<CarouselNext className="-right-2 size-12" />
			</Carousel>
		</div>
	);
};

export default PlacesCarousel;

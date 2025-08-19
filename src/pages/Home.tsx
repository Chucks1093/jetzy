import AISearchInput from '@/components/dashboard/AISearchInput';
import LocationCard from '@/components/dashboard/LocationCard';
import { motion } from 'framer-motion';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import LocationSelector from '@/components/dashboard/LocationSelector';
import Autoplay from 'embla-carousel-autoplay';
const LocationCarousel = () => {
	// Sample data
	const data = [
		{
			image: '/locations/beach-people.jpg',
			question: 'Where can I find the best beaches for swimming?',
			likeCount: 187,
		},
		{
			image: '/locations/beach.jpg',
			question: 'What are the most scenic coastal drives nearby?',
			likeCount: 142,
		},
		{
			image: '/locations/mountain-forest.jpg',
			question: 'Which hiking trails offer the best mountain views?',
			likeCount: 256,
		},
		{
			image: '/locations/china.jpg',
			question: 'Where can I find the most unique cocktails around here?',
			likeCount: 203,
		},
		{
			image: '/locations/beach-people.jpg',
			question: 'Where can I find the best beaches for swimming?',
			likeCount: 187,
		},
		{
			image: '/locations/beach.jpg',
			question: 'What are the most scenic coastal drives nearby?',
			likeCount: 142,
		},
		{
			image: '/locations/mountain-forest.jpg',
			question: 'Which hiking trails offer the best mountain views?',
			likeCount: 256,
		},
		{
			image: '/locations/china.jpg',
			question: 'Where can I find the most unique cocktails around here?',
			likeCount: 203,
		},
	];

	return (
		<div className=" py-8 px-4 w-[90%] mx-auto">
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
					{data.map((item, index) => (
						<CarouselItem key={index} className="pl-2 md:pl-4 basis-1/4">
							<LocationCard {...item} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="-left-2 size-12" />
				<CarouselNext className="-right-2 size-12" />
			</Carousel>
		</div>
	);
};

function Home() {
	return (
		<motion.div
			className="max-w-7xl mx-auto p-6 pt-10  h-full flex items-center justify-center"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<LocationSelector className="absolute top-10 right-10" />
			<div className="w-full relative top-[5%]">
				<div className="flex items-center justify-center gap-3">
					<div className="bg-slate-800 flex items-center justify-center p-3 border border-white rounded-full w-fit">
						<img
							src="/icons/logo.svg"
							alt="Nora AI Logo"
							className="h-7 w-7"
							onError={e => {
								// Fallback to text if image fails to load
								e.currentTarget.style.display = 'none';
								e.currentTarget.parentElement!.innerHTML =
									'<span class="text-white font-bold text-sm">J</span>';
							}}
						/>
					</div>
					<h2 className=" text-[2.2rem] font-medium text-gray-900 font-montserrat tracking-tight">
						Start Exploring Now.
					</h2>
				</div>
				<LocationCarousel />
				<AISearchInput />
			</div>
		</motion.div>
	);
}

export default Home;

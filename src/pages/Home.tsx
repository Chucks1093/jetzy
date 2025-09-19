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
	// New York specific data
	const data = [
		{
			image: '/locations/high-line.jpg',
			question: 'What are the best spots to visit in Central Park?',
			likeCount: 324,
		},
		{
			image: '/locations/soho-shopping.jpg',
			question: 'Where can I get the best views of the Brooklyn Bridge?',
			likeCount: 289,
		},
		{
			image: '/locations/time-square.jpg',
			question: 'What are the must-see Broadway shows in Times Square?',
			likeCount: 456,
		},
		{
			image: '/locations/chinatown-nyc.jpg',
			question: 'Where can I find the best vintage shopping in SoHo?',
			likeCount: 198,
		},
		{
			image: '/locations/brooklyn-bridge.jpg',
			question: 'What are the most authentic dim sum places in Chinatown?',
			likeCount: 267,
		},
		{
			image: '/locations/chinatown-nyc.jpg',
			question: 'What are the best photo spots along the High Line?',
			likeCount: 342,
		},
		{
			image: '/images/image-1.jpg',
			question:
				'Where can I find the coolest speakeasy bars in East Village?',
			likeCount: 178,
		},
		{
			image: '/images/image-2.jpg',
			question: 'What are the trendiest rooftop bars in Williamsburg?',
			likeCount: 231,
		},
		{
			image: '/images/image-3.jpg',
			question: 'Which restaurants serve the best pizza in Little Italy?',
			likeCount: 389,
		},
		{
			image: '/images/image-4.jpg',
			question:
				'Where can I experience the best jazz clubs in Greenwich Village?',
			likeCount: 156,
		},
		{
			image: '/images/image-5.jpg',
			question: 'What are the must-try food vendors at Chelsea Market?',
			likeCount: 298,
		},
		{
			image: '/images/image-7.jpg',
			question: "What's the best way to visit the Statue of Liberty?",
			likeCount: 412,
		},
	];

	return (
		<div className=" py-8 md:px-4 max-w-[67rem] mx-auto">
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
						<CarouselItem
							key={index}
							className="pl-2 md:pl-4 basis-1/1 md:basis-1/4"
						>
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
			className="max-w-7xl mx-auto px-6 pt-10  h-full flex items-center justify-center relative"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<LocationSelector className="absolute top-5 right-5" />
			<div className="w-full relative top-[5%] ">
				<div className="flex flex-col md:flex-row mt-14 md:mt-0 items-center justify-center  gap-3">
					<div className="bg-slate-800 md:flex items-center justify-center p-3 border border-white rounded-full w-fit hidden">
						<img
							src="/icons/logo.svg"
							alt="Nora AI Logo"
							className="md:size-6 size-4"
							onError={e => {
								// Fallback to text if image fails to load
								e.currentTarget.style.display = 'none';
								e.currentTarget.parentElement!.innerHTML =
									'<span class="text-white font-bold text-sm">J</span>';
							}}
						/>
					</div>
					<h2 className=" text-2xl md:text-[2.4rem] md:font-medium font-semibold text-gray-600 font-montserrat  tracking-tight text-center">
						Discover New York City Now.
					</h2>
				</div>
				<LocationCarousel />
				<AISearchInput className="mt-8" />
			</div>
		</motion.div>
	);
}

export default Home;

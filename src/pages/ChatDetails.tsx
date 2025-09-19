import React, { Fragment, useState } from 'react';
import {
	ThumbsUp,
	ThumbsDown,
	ChevronRight,
	Bookmark,
	Map,
	Heart,
	Share,
	Globe,
	RefreshCcw,
	Sparkles,
	SendHorizonal,
	PartyPopper,
	Hotel,
	Salad,
} from 'lucide-react';

import PlacesCarousel from '@/components/dashboard/PlaceCard';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import ChatInputDemo from '@/assets/ChatInput';
import PlaceDetails from '@/components/dashboard/PlaceDetails';
import { usePlaceDetailsModal } from '@/hooks/useModalStore';
import { cn } from '@/lib/utils';

type ChatData = {
	timestamp: string;
	prompt: string;
	response: {
		text: string;
		places: [
			{
				name: string;
				description: string;
				info: string;
				number: number;
				rating: number;
				reviewCount: number;
				location: string;
				pricing: string;
				features: string[];
				operatingHours: {
					weekdays: string;
					weekends: string;
				};
				images: string[];
				postCount: number;
			}
		];
	};
};

const chatMessages: ChatData[] = [
	{
		timestamp: 'AUG 5 AT 6:36 PM',
		prompt: 'Tell me more about Mega Chicken',
		response: {
			text: 'Here are some top attractions you can explore in Ikeja and Lagos:',
			places: [
				{
					name: 'Mega Chicken',
					number: 1,
					rating: 4.4,
					reviewCount: 5400,
					location: 'Ikeja, Lagos State',
					description:
						"Absolutely! Mega Chicken is a popular dining spot in Ikeja, Lagos State, known for its wide variety of dishes and family-friendly atmosphere. With a strong rating of 4.4 from over 5,400 reviews, it's a favorite among locals and visitors alike for both dine-in and takeaway options. The restaurant offers moderate pricing, making it accessible for most budgets.",
					info: "You can visit Mega Chicken any day of the week—it's open from 7 AM to 10 PM Monday through Saturday, and from 8 AM to 10 PM on Sundays. Whether you're craving Nigerian classics or international cuisine, you'll find plenty of choices here. It's also a great spot for groups or families thanks to its spacious setting. \n \n Why visit? It's perfect if you're looking for a reliable place with generous portions, quick service, and a lively local vibe. Tip: Try to visit during off-peak hours if you prefer a quieter experience! Would you like recommendations for what to try at Mega Chicken or are you interested in exploring other restaurants nearby?",
					pricing: 'moderate',
					features: ['dine-in', 'takeaway', 'family-friendly'],
					operatingHours: {
						weekdays: '7 AM to 10 PM Monday through Saturday',
						weekends: '8 AM to 10 PM on Sundays',
					},
					images: ['/restaurant-interior.jpg'],
					postCount: 30,
				},
			],
		},
	},
];

// Components
interface ChatProps {
	data: ChatData;
}

const Chat: React.FC<ChatProps> = ({ data, ...props }) => {
	console.log(props);
	const { open } = usePlaceDetailsModal();

	return (
		<Fragment>
			{/* Timestamp */}
			<p className="text-gray-400 text-xs text-center mb-6 font-medium">
				AUG 5 AT 6:36 PM
			</p>

			{/* User Message */}
			<div className="flex justify-end mb-6">
				<div className="bg-gradient-to-r from-zinc-700 to-zinc-800 text-white px-5 py-3 rounded-3xl rounded-br-md max-w-sm shadow-sm">
					<p className="text-sm leading-relaxed">{data.prompt}</p>
				</div>
			</div>

			{/* AI Response */}
			<div className="flex flex-col space-y-6">
				{/* AI Avatar and Name */}
				<div className="flex items-center gap-3 mb-2">
					<div className="bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center p-2.5 rounded-full shadow-sm">
						<img
							src="/icons/logo.svg"
							alt="Nora AI Logo"
							className="h-4 w-4"
							onError={e => {
								e.currentTarget.style.display = 'none';
								e.currentTarget.parentElement!.innerHTML =
									'<span class="text-white font-bold text-sm">J</span>';
							}}
						/>
					</div>
					<span className="font-semibold text-gray-900 text-sm">
						Jetzy AI
					</span>
				</div>

				{/* Places */}
				<div className="space-y-8 mt-3">
					{data.response.places.map((item, i) => (
						<div key={i} className=" rounded-2xl ">
							{/* Place Header */}
							<div className="flex items-center justify-between mb-4">
								<button
									onClick={open}
									className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-900 text-gray-100 px-4 py-2.5 rounded-full text-sm font-medium transition-colors group"
								>
									<span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
										{i + 1}
									</span>
									{item.name}
									<ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
								</button>
								<button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
									<Map className="text-blue-500 h-5 w-5" />
								</button>
							</div>

							{/* Description */}
							<div className="text-gray-700 mb-5 leading-relaxed text-sm">
								{item.description}
							</div>

							{/* Video Section */}
							<div className="relative mb-4 group">
								<video
									src="/videos/demo-video.mp4"
									loop
									autoPlay
									muted
									playsInline
									preload="metadata"
									className="w-full rounded-xl shadow-sm"
								/>
								<div className="absolute right-3 bottom-3 bg-black/60 backdrop-blur-sm p-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
									<Globe className="text-white h-4 w-4" />
								</div>
							</div>

							{/* Engagement and Actions Row */}
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-1 text-sm bg-white rounded-full border border-gray-200 px-3 py-1.5 shadow-sm">
									<Heart
										fill="currentColor"
										className="text-red-500 w-4 h-4"
									/>
									<span className="text-gray-600 font-medium">
										200+ likes
									</span>
								</div>
								<div className="flex gap-1">
									<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
										<Bookmark className="h-4 w-4 text-gray-500 hover:text-gray-700" />
									</button>
									<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
										<Share className="h-4 w-4 text-gray-500 hover:text-gray-700" />
									</button>
								</div>
							</div>

							{/* Additional Info */}
							{item.info && (
								<div className="text-gray-700 mb-5 leading-relaxed text-sm  rounded-lg  ">
									{item.info}
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex items-center gap-2  ">
								<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
									<ThumbsUp className="h-5 w-5 text-gray-500 group-hover:text-green-600" />
								</button>
								<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
									<ThumbsDown className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
								</button>
								<button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto group">
									<RefreshCcw className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
									<span className="text-sm text-gray-600 group-hover:text-blue-600 font-medium">
										Regenerate
									</span>
								</button>
							</div>

							{/* More Questions */}
							<div className="mt-6">
								<MoreQuestions
									questions={[
										'Can you tell me more about Ndubuisi Kanu Park?',
										'Are there any cultural attractions nearby?',
										'What are some fun activities for families?',
									]}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
};

type MoreQuestionsProps = {
	questions: string[];
};

const MoreQuestions: React.FC<MoreQuestionsProps> = props => {
	return (
		<div className="mt-6">
			{/* Accordion Section */}
			<Accordion
				type="single"
				collapsible
				className="bg-white rounded-xl border border-gray-200 shadow-sm"
			>
				<AccordionItem value="item-1" className="border-none">
					<AccordionTrigger className="px-4 py-4 hover:bg-gray-50/80 rounded-xl hover:no-underline transition-colors">
						<div className="flex items-center gap-3 text-gray-700">
							<div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full">
								<Sparkles className="w-4 h-4 text-blue-600" />
							</div>
							<p className="font-semibold text-sm">
								Ask me more questions
							</p>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<div className="space-y-2 mt-2">
							{props.questions.map((question, i) => (
								<button
									key={i}
									className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100 hover:border-gray-200"
								>
									<p className="text-gray-700 text-sm text-left leading-relaxed">
										{question}
									</p>
									<SendHorizonal className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-3" />
								</button>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Category Buttons */}
			<div className="mt-6">
				<p className="text-gray-500 text-xs font-medium mb-6 px-1">
					EXPLORE CATEGORIES
				</p>
				<div className="flex gap-2">
					<button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors border border-gray-200">
						<PartyPopper className="w-4 h-4" />
						Activities
					</button>

					<button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors border border-gray-200">
						<Hotel className="w-4 h-4" />
						Hotels
					</button>

					<button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors border border-gray-200">
						<Salad className="w-4 h-4" />
						Food
					</button>
				</div>
			</div>
		</div>
	);
};

const AIChatInterface: React.FC = () => {
	const [messages] = useState<ChatData[]>(chatMessages);

	const { isOpen, close } = usePlaceDetailsModal();

	const restaurantData = {
		id: '1',
		name: 'Mega Chicken',
		rating: 4.4,
		reviewCount: '5.3K',
		priceLevel: '$$',
		image: '/images/restaurant.jpg',
		description:
			'Mega Chicken in Ikeja is a sprawling four-story restaurant with something for everyone—African, continental, Chinese cuisines, and a playground for kids. Guests rave about the delicious, affordable meals, ample parking, and wheelchair accessibility. While festive seasons bring crowds and occasional slow service, the vibrant atmosphere, variety of dishes...',
	};

	const handleAddToPlan = () => {
		console.log('Added to plan');
	};

	const handleBookmark = () => {
		console.log('Bookmarked');
	};

	const handleShare = () => {
		console.log('Shared');
	};

	const handleClose = () => {
		close();
		console.log('Close clicked');
	};

	return (
		<div className="flex flex-col md:flex-row justify-between max-w-8xl mx-auto h-screen gap-4 p-4 overflow-hidden ">
			<div className="flex flex-col h-full overflow-y-auto overflow-x-hidden bg-white py-3 md:w-[45%] px-2 relative">
				{/* Chat Messages */}

				<div
					className={cn(
						'flex-1  py-8 px-4 space-y-4 ',
						isOpen && 'hidden'
					)}
				>
					{messages.map(message => (
						<Chat data={message} />
					))}
				</div>

				<ChatInputDemo />
				<PlaceDetails
					restaurant={restaurantData}
					onClose={handleClose}
					onAddToPlan={handleAddToPlan}
					onBookmark={handleBookmark}
					onShare={handleShare}
					className="absolute top-0 left-0 w-full z-10 h-full bg-white"
				/>
			</div>
			<div className="rounded-lg overflow-hidden relative md:w-[65%]">
				<img
					src="/map.png"
					alt=""
					className="w-full h-screen object-cover "
				/>
				<PlacesCarousel className="absolute bottom-2 " />
			</div>
		</div>
	);
};

export default AIChatInterface;

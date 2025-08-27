import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Search, ListFilter, CirclePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const travelPosts = [
	{
		id: '1',
		title: 'Art and Hiking Adventure in Portland',
		image: '/images/explore.webp',
		author: {
			name: 'John Doe',
			avatar: '/images/author.jpeg',
			username: 'William Doe',
		},
		likes: 0,
		comments: 0,
		isLiked: false,
	},
	{
		id: '2',
		title: "Brooklyn's Hidden Thai gem ",
		image: '/images/explore.webp',
		author: {
			name: 'Amelia Sofia',
			avatar: '/images/author.jpeg',
			username: 'Amelia Sofia',
		},
		likes: 9,
		comments: 2,
		isLiked: false,
	},
	{
		id: '3',
		title: 'Singapore JEM',
		image: '/images/explore.webp',
		author: {
			name: 'Ciera',
			avatar: '/images/author.jpeg',
			username: 'Ciera',
		},
		likes: 43,
		comments: 2,
		isLiked: true,
	},
	{
		id: '4',
		title: 'Hidden Gems in San Francisco Bay Area',
		image: '/images/explore.webp',
		author: {
			name: 'Explorer',
			avatar: '/images/author.jpeg',
			username: 'explorer',
		},
		likes: 15,
		comments: 5,
		isLiked: false,
	},
	{
		id: '5',
		title: 'Winter Wonderland Adventures',
		image: '/images/explore.webp',
		author: {
			name: 'Adventure Seeker',
			avatar: '/images/author.jpeg',
			username: 'adventureseeker',
		},
		likes: 28,
		comments: 8,
		isLiked: false,
		showAddButton: true,
	},
	{
		id: '6',
		title: 'Authentic Japanese Ramen Experience',
		image: '/images/explore.webp',
		author: {
			name: 'Foodie Explorer',
			avatar: '/images/author.jpeg',
			username: 'foodieexplorer',
		},
		likes: 67,
		comments: 12,
		isLiked: true,
	},
];

export function SearchHeader() {
	return (
		<div className="w-full max-w-4xl mx-auto space-y-4">
			<div className="flex gap-3">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-5" />
					<Input
						placeholder="Search travel tips, posts and more"
						className="pl-10 bg-background outline-none "
					/>
				</div>
				<Select defaultValue="all">
					<SelectTrigger className="w-40 bg-white border-border">
						<ListFilter className="w-4 h-4 mr-2" />
						<SelectValue placeholder="Type: All" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Type: All</SelectItem>
						<SelectItem value="post">Post</SelectItem>
						<SelectItem value="adventure">Itinerary</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

const cities = [
	'All',
	'New York',
	'Los Angeles',
	'San Francisco',
	'Tokyo',
	'London',
	'Paris',
	'Rome',
];

export function CityFilters() {
	const [activeCity, setActiveCity] = useState('All');

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="flex gap-2 overflow-x-auto pb-2">
				{cities.map(city => (
					<Button
						key={city}
						variant={activeCity === city ? 'default' : 'outline'}
						size="sm"
						onClick={() => setActiveCity(city)}
						className={`whitespace-nowrap ${
							activeCity === city
								? 'bg-primary text-sm text-primary-foreground hover:bg-primary/90'
								: ' border-border text-sm hover:bg-accent'
						}`}
					>
						{city}
					</Button>
				))}
			</div>
		</div>
	);
}

interface TravelPost {
	id: string;
	title: string;
	image: string;
	author: {
		name: string;
		avatar: string;
		username: string;
	};
	likes: number;
	comments: number;
	isLiked?: boolean;
	showAddButton?: boolean;
}

interface TravelPostCardProps {
	post: TravelPost;
}

export function TravelPostCard({ post }: TravelPostCardProps) {
	const [isLiked, setIsLiked] = useState(post.isLiked || false);
	const [likeCount, setLikeCount] = useState(post.likes);

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
	};

	return (
		<Card className="group p overflow-hidden transition-all duration-300 pt-0 hover:shadow-lg hover:scale-[1.02] border-border ">
			<div className="relative">
				<img
					src={post.image || '/placeholder.svg'}
					alt={post.title}
					className="w-full h-48 object-cover"
				/>
			</div>
			<CardContent className="">
				<h3 className="font-semibold text-card-foreground text-balance mb-3 line-clamp-2">
					{post.title}
				</h3>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar className="w-8 h-8">
							<AvatarImage
								src={post.author.avatar || '/placeholder.svg'}
								alt={post.author.name}
							/>
							<AvatarFallback>
								{post.author.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<span className="text-sm text-muted-foreground">
							{post.author.username}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleLike}
							className="flex items-center gap-1 text-muted-foreground hover:text-primary"
						>
							<Heart
								className={`w-4 h-4 ${
									isLiked ? 'fill-primary text-primary' : ''
								}`}
							/>
							<span className="text-sm">{likeCount}</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center gap-1 text-muted-foreground hover:text-primary"
						>
							<MessageCircle className="w-4 h-4" />
							<span className="text-sm">{post.comments}</span>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function Explore() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8 space-y-8">
				<div className=" absolute  z-50 bottom-32 left-1/2 right-1/2 ">
					<Button
						size="lg"
						className="fixed bottom-10  border-3 outline-8 bg-black border-white py-5 px-12"
					>
						<CirclePlus className="w-4 h-4 mr-1" />
						Add Post
					</Button>
				</div>

				<SearchHeader />
				<CityFilters />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{travelPosts.map(post => (
						<TravelPostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</div>
	);
}

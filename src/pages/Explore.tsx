import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, ListFilter, ChevronDown, Map, Plus } from 'lucide-react';
import { useState } from 'react';
import FormInput from '@/components/shared/FormInput';
import TabTriggers from '@/components/shared/TabTriggers';
import TravelPostCard from '@/components/dashboard/TravelPostCard';
import { Tabs } from '@/components/ui/tabs';

const travelPosts = [
	{
		id: '1',
		title: 'Amazing sunset views from Brooklyn Bridge',
		images: ['/images/image-1.jpg', '/images/image-3.jpg'],
		author: {
			name: 'Sarah Chen',
			avatar: '/avatars/avatar-5.png',
			username: 'sarahexplores',
		},
		likes: 1247,
		comments: 89,
		isLiked: true,
		showAddButton: true,
	},
	{
		id: '2',
		title: 'Central Park in fall colors - absolutely breathtaking!',
		images: [
			'/images/image-4.jpg',
			'/images/image-5.jpg',
			'/images/image-6.jpg',
		],
		author: {
			name: 'Mike Rodriguez',
			avatar: '/avatars/avatar-12.png',
			username: 'mikeontour',
		},
		likes: 892,
		comments: 156,
		isLiked: false,
		showAddButton: false,
	},
	{
		id: '3',
		title: 'Times Square at midnight - the city never sleeps',
		images: ['/images/image-8.jpg'],
		author: {
			name: 'Emma Thompson',
			avatar: '/avatars/avatar-23.png',
			username: 'emmawanders',
		},
		likes: 2341,
		comments: 203,
		isLiked: true,
	},
	{
		id: '4',
		title: 'Best pizza slice in Little Italy - found this hidden gem!',
		images: ['/images/image-7.jpg', '/images/image-1.jpg'],
		author: {
			name: 'Alex Kim',
			avatar: '/avatars/avatar-7.png',
			username: 'alexeats',
		},
		likes: 567,
		comments: 78,
	},
	{
		id: '5',
		title: 'High Line walk during golden hour',
		images: [
			'/images/image-3.jpg',
			'/images/image-4.jpg',
			'/images/image-5.jpg',
		],
		author: {
			name: 'Jessica Park',
			avatar: '/avatars/avatar-18.png',
			username: 'jessexplores',
		},
		likes: 1834,
		comments: 124,
		isLiked: false,
		showAddButton: true,
	},
	{
		id: '6',
		title: 'Statue of Liberty ferry ride on a perfect morning',
		images: ['/images/image-6.jpg', '/images/image-7.jpg'],
		author: {
			name: 'David Wilson',
			avatar: '/avatars/avatar-3.png',
			username: 'davidnyc',
		},
		likes: 934,
		comments: 67,
		isLiked: true,
		showAddButton: false,
	},
	{
		id: '7',
		title: 'SoHo shopping district vibes',
		images: [
			'/images/image-9.jpg',
			'/images/image-2.jpg',
			'/images/image-8.jpg',
		],
		author: {
			name: 'Olivia Martinez',
			avatar: '/avatars/avatar-29.png',
			username: 'oliviastyle',
		},
		likes: 1456,
		comments: 213,
		isLiked: false,
	},
	{
		id: '8',
		title: 'Manhattan skyline from Roosevelt Island tram',
		images: ['/images/image-1.jpg'],
		author: {
			name: 'James Foster',
			avatar: '/avatars/avatar-14.png',
			username: 'jamesviews',
		},
		likes: 2089,
		comments: 178,
		isLiked: true,
		showAddButton: true,
	},
	{
		id: '9',
		title: "Street art in Williamsburg - Brooklyn's creative heart",
		images: ['/images/image-2.jpg', '/images/image-3.jpg'],
		author: {
			name: 'Maya Patel',
			avatar: '/avatars/avatar-21.png',
			username: 'mayaartist',
		},
		likes: 723,
		comments: 95,
		isLiked: false,
		showAddButton: false,
	},
	{
		id: '10',
		title: '9/11 Memorial - a place of reflection and remembrance',
		images: [
			'/images/image-2.jpg',
			'/images/image-4.jpg',
			'/images/image-7.jpg',
		],
		author: {
			name: 'Robert Chen',
			avatar: '/avatars/avatar-31.png',
			username: 'robertremembers',
		},
		likes: 3421,
		comments: 289,
		isLiked: true,
		showAddButton: true,
	},
];

const CityFilters = () => {
	return (
		<TabTriggers
			className=""
			tabs={[
				{
					value: 'all',
					label: 'All',
				},
				{
					value: 'new-yourk',
					label: 'New York',
				},
				{
					value: 'los-angeles',
					label: 'Los Angeles',
				},
				{
					value: 'san-francisco',
					label: 'San Francisco',
				},
			]}
		/>
	);
};

export function SearchHeader() {
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const getFilterDisplayText = () => {
		switch (statusFilter) {
			case 'verified':
				return 'Verified';
			case 'review':
				return 'Under Review';
			case 'unaccepted':
				return 'Unaccepted';
			default:
				return 'All status';
		}
	};

	const handleStatusFilterChange = (status: string) => {
		setStatusFilter(status);
	};
	const SearchIcon = () => (
		<div className="text-gray-400 ">
			<Search className="size-5" />
		</div>
	);
	return (
		<div className=" flex items-center justify-between relative gap-5  pb-5">
			<FormInput
				label=""
				value={searchQuery}
				onChange={value => setSearchQuery(value)}
				placeholder="Search travel tips, posts and more"
				prefix={<SearchIcon />}
				inputClassName="h-13"
				className=" w-full max-w-2xl "
				wrapperClassName="px-3 rounded-lg border-gray-300"
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="hidden md:inline-flex items-center px-5 py-2.5 text-sm  font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-100 h-full ml-auto ">
						<ListFilter className="w-4 h-4 mr-2 -ml-1 text-gray-500" />
						{getFilterDisplayText()}
						<ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="w-48">
					<DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase">
						Status
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => handleStatusFilterChange('all')}
						className={`cursor-pointer ${
							statusFilter === 'all'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-700'
						}`}
					>
						All
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleStatusFilterChange('verified')}
						className={`cursor-pointer ${
							statusFilter === 'verified'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-700'
						}`}
					>
						Verified
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleStatusFilterChange('review')}
						className={`cursor-pointer ${
							statusFilter === 'review'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-700'
						}`}
					>
						Under Review
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleStatusFilterChange('unaccepted')}
						className={`cursor-pointer ${
							statusFilter === 'unaccepted'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-700'
						}`}
					>
						Unaccepted
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<button className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2 text-zinc-100">
				<Plus />
				Add Post
			</button>
		</div>
	);
}

export default function Explore() {
	return (
		<div className="h-screen bg-[#faf9f6] text-gray-900 max-w-6xl mx-auto pt-13 px-4 flex flex-col relative">
			<div className="flex gap-2 items-center mb-2">
				<Map className="size-7" />
				<h1 className="text-2xl font-manrope font-medium text-zinc-600">
					Explore Locations Near you
				</h1>
			</div>
			<Tabs className="mt-4 space-y-1 " defaultValue="all">
				<SearchHeader />
				<CityFilters />
			</Tabs>
			<div className="px-4 flex-1 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-5 mt-5">
				{travelPosts.map(post => (
					<TravelPostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}

import type { InfoItemProps } from '@/components/dashboard/InfoItem';

export const reviewsData = [
	{
		userName: 'Nnaemezie Asogwa',
		rating: 5,
		reviewText:
			"At Freedom Park you'd find an art Gallery, a disco space, a historical museum, two different platforms of open - air performance and stage shows, craft shops, food courts etc. Fantastic facility for musicals, live shows and performances, pepper soup and grilled fish, robust and vibrant night life, open- air relaxation area! It is a memorial and leisure park area in the middle of...",
		images: [
			'/images/image-1.jpg',
			'/images/image-2.jpg',
			'/images/image-3.jpg',
			'/images/image-4.jpg',
			'/images/image-5.jpg',
		],
		showSourceIcon: true,
		showExternalLink: true,
	},
	{
		userName: 'Sarah Johnson',
		rating: 4,
		reviewText:
			'Amazing place to visit with family and friends. The art gallery has some incredible local artwork and the food court offers delicious traditional Nigerian dishes. The atmosphere is vibrant and welcoming.',
		images: [
			'/images/image-6.jpg',
			'/images/image-7.jpg',
			'/images/image-2.jpg',
		],
	},
	{
		userName: 'Michael Chen',
		rating: 5,
		reviewText:
			'One of the best cultural experiences in Lagos! The historical museum provides great insight into Nigerian heritage, and the live performances are outstanding. Highly recommend for tourists.',
		images: ['/images/image-3.jpg', '/images/image-5.jpg'],
	},
];

export const trendingData = [
	{
		image: '/images/image-4.jpg',
		authorImage: '/images/avatar-1.jpg',
		authorName: 'Chef Maria Santos',
		likes: 2847,
		comments: 156,
		description:
			'Just discovered this amazing fusion restaurant in Victoria Island! The jollof pasta is absolutely incredible 🍝',
	},
	{
		image: '/images/image-5.jpg',
		authorImage: '/images/avatar-2.jpg',
		authorName: 'David Explorer',
		likes: 1924,
		comments: 203,
		description:
			'Sunset at Tarkwa Bay Beach never gets old. Perfect weekend escape from Lagos hustle!',
	},
	{
		image: '/images/image-2.jpg',
		authorImage: '/images/avatar-3.jpg',
		authorName: 'Aisha Tech',
		likes: 3156,
		comments: 89,
		description:
			'Finally launched my first mobile app! Special thanks to the amazing Lagos tech community 🚀',
	},
	{
		image: '/images/image-3.jpg',
		authorImage: '/images/avatar-4.jpg',
		authorName: 'Kemi Creative',
		likes: 987,
		comments: 67,
		description:
			'New artwork inspired by Lagos street culture. Art has the power to tell our stories ✨',
	},
	{
		image: '/images/image-5.jpg',
		authorImage: '/images/avatar-5.jpg',
		authorName: 'Fitness Coach Bola',
		likes: 1456,
		comments: 124,
		description:
			'Morning workout at the National Stadium. Consistency is key to achieving your goals! 💪',
	},
	{
		image: '/images/image-7.jpg',
		authorImage: '/images/avatar-6.jpg',
		authorName: 'Event Planner Joy',
		likes: 2203,
		comments: 178,
		description:
			'What an incredible night at the Lagos Music Festival! The energy was absolutely electric ⚡',
	},
	{
		image: '/images/image-2.jpg',
		authorImage: '/images/avatar-7.jpg',
		authorName: 'Entrepreneur Sam',
		likes: 1789,
		comments: 95,
		description:
			'Just opened our third location in Lekki! Dreams do come true with hard work and persistence',
	},
	{
		image: '/images/image-7.jpg',
		authorImage: '/images/avatar-8.jpg',
		authorName: 'Fashion Designer Temi',
		likes: 3421,
		comments: 234,
		description:
			'Proud to showcase African prints on the international runway. Our heritage is beautiful! 🌍',
	},
	{
		image: '/images/image-4.jpg',
		authorImage: '/images/avatar-9.jpg',
		authorName: 'Nature Lover Seun',
		likes: 1167,
		comments: 78,
		description:
			'Hidden gem: Lekki Conservation Centre at dawn. Sometimes you need to disconnect to reconnect 🌿',
	},
	{
		image: '/images/image-1.jpg',
		authorImage: '/images/avatar-10.jpg',
		authorName: 'Cultural Historian Funmi',
		likes: 892,
		comments: 56,
		description:
			'Exploring the rich history of Lagos Island. Every corner has a story waiting to be told',
	},
];

export const infoData: InfoItemProps[] = [
	{
		icon: 'address',
		title: 'Address',
		content:
			'C&KW+MLM, Old Prison Ground,1, Hospital Road, adjacent St Nicholas Hospital, Lagos Island, Lagos, Nigeria',
		actionText: 'Map',
		actionColor: 'blue',
		showExternalLink: true,
		onClick: () => console.log('Open map'),
	},
	{
		icon: 'phone',
		title: 'Phone',
		content: '+234 802 319 0976',
		actionText: 'Call',
		actionColor: 'blue',
		showExternalLink: true,
		onClick: () => console.log('Make call'),
	},
	{
		icon: 'website',
		title: 'Website',
		content: 'freedomparklagos.com',
		actionText: 'Visit',
		actionColor: 'blue',
		showExternalLink: true,
		onClick: () => console.log('Open website'),
	},
	{
		icon: 'hours',
		title: 'See open hours',
		content: 'See open hours',
		actionText: 'Open',
		actionColor: 'blue',
		showChevron: true,
		onClick: () => console.log('Show hours'),
	},
];

export const placesData = [
	{
		id: '1',
		name: 'Ndubuisi Kanu Park',
		rating: 4.1,
		reviews: '2.7K',
		image: '/images/image-1.jpg',
		status: 'Open until 10pm',
		statusColor: 'bg-green-500',
		section: 'ai',
	},
	{
		id: '2',
		name: 'Freedom Park Lagos',
		rating: 4.2,
		reviews: '2.4K',
		image: '/images/image-2.jpg',
		status: 'Open until 10pm',
		statusColor: 'bg-green-500',
		section: 'ai',
	},
	{
		id: '3',
		name: 'Apapa Amusement Park',
		rating: 4.0,
		reviews: '1.3K',
		image: '/images/image-3.jpg',
		status: 'Closed',
		statusColor: 'bg-red-500',
		section: 'ai',
	},
	{
		id: '4',
		name: 'Johnson Jakande Center',
		rating: 4.3,
		reviews: '2.6K',
		image: '/images/image-3.jpg',
		status: 'Closed',
		statusColor: 'bg-red-500',
		section: 'similar',
	},
	{
		id: '5',
		name: 'Radisson Blu Hotel',
		rating: 4.6,
		reviews: '6.2K',
		image: '/images/image-5.jpg',
		status: 'Open 24 hours',
		statusColor: 'bg-green-500',
		section: 'similar',
	},
	{
		id: '6',
		name: 'Sheraton Lagos Hotel',
		rating: 4.4,
		reviews: '5.6K',
		image: '/images/image-6.jpg',
		status: 'Open 24 hours',
		statusColor: 'bg-green-500',
		section: 'similar',
	},
];

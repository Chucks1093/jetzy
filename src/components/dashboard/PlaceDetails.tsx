import React, { useState } from 'react';
import { X, Plus, Bookmark, Share2, Star } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { usePlaceDetailsModal } from '@/hooks/useModalStore';

import InfoItem from './InfoItem';
import {
	reviewsData,
	infoData,
	placesData,
	trendingData,
} from '@/data/places.data';
import PlaceReview from './PlaceReview';
import { PlaceCard } from './PlaceCard';
import PhotoSpots from './PhotoSpots';

import TrendingCard from './TrendingCard';

type RestaurantData = {
	id: string;
	name: string;
	rating: number;
	reviewCount: string;
	priceLevel: string;
	image: string;
	description: string;
};

type RestaurantDetailsPageProps = {
	restaurant: RestaurantData;
	onClose?: () => void;
	onAddToPlan?: () => void;
	onBookmark?: () => void;
	onShare?: () => void;
	className?: string;
};

const imagesData = [
	{
		id: 1,
		src: '/images/image-1.jpg',
		alt: 'Gallery Image 1',
	},
	{
		id: 2,
		src: '/images/image-2.jpg',
		alt: 'Gallery Image 2',
	},
	{
		id: 3,
		src: '/images/image-3.jpg',
		alt: 'Gallery Image 3',
	},
	{
		id: 4,
		src: '/images/image-4.jpg',
		alt: 'Gallery Image 4',
	},
	{
		id: 5,
		src: '/images/image-5.jpg',
		alt: 'Gallery Image 5',
	},
	{
		id: 6,
		src: '/images/image-6.jpg',
		alt: 'Gallery Image 6',
	},
	{
		id: 7,
		src: '/images/image-7.jpg',
		alt: 'Gallery Image 7',
	},
];

interface ImageItemProps {
	src: string;
	alt: string;
	index: number;
}

const ImageItem: React.FC<ImageItemProps> = ({ src, alt, index }) => {
	return (
		<div
			key={index}
			className="overflow-hidden rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
		>
			<img
				src={src}
				alt={alt}
				className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
			/>
		</div>
	);
};

const PlaceDetails: React.FC<RestaurantDetailsPageProps> = ({
	restaurant,
	onClose,
	onAddToPlan,
	onBookmark,
	onShare,
	className = '',
}) => {
	const [activeTab, setActiveTab] = useState('trending');
	const { isOpen } = usePlaceDetailsModal();

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < Math.floor(rating)
						? 'text-yellow-400 fill-yellow-400'
						: i < rating
						? 'text-yellow-400 fill-yellow-400'
						: 'text-gray-300'
				}`}
			/>
		));
	};

	return (
		<div
			className={`rounded-xl border shadow-none ${className} flex flex-col h-full max-h-screen transition-transform duration-500 ease-in-out ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			{/* Header - Fixed */}
			<div className="relative p-6 pb-4 border-b border-gray-100 flex-shrink-0">
				<button
					onClick={onClose}
					className="ml-auto top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors mb-4"
				>
					<X className="h-4 w-4" />
				</button>

				{/* Restaurant Header */}
				<div className="flex items-start gap-4 mt-4 flex-1">
					<div className="w-[4.4rem] h-[4.4rem] rounded-lg overflow-hidden flex-shrink-0">
						<img
							src={restaurant.image}
							alt={restaurant.name}
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="flex-1 min-w-0">
						<h1 className="text-2xl font-manrope font-bold text-gray-900 mb-1">
							{restaurant.name}
						</h1>

						<div className="flex items-center gap-2 mb-3 font-manrope">
							<span className="text-lg font-medium text-gray-900">
								{restaurant.rating}
							</span>
							<div className="flex items-center">
								{renderStars(restaurant.rating)}
							</div>
							<span className="text-gray-600">
								({restaurant.reviewCount} reviews)
							</span>
							<span className="text-gray-600">•</span>
							<span className="font-medium text-gray-900">
								{restaurant.priceLevel}
							</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-3 mt-4">
					<button
						onClick={onAddToPlan}
						className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm w-fit"
					>
						<Plus className="w-4 h-4" />
						Add to Plan
					</button>

					<button
						onClick={onBookmark}
						className="bg-white border border-gray-300 hover:bg-gray-50 p-2 rounded-lg flex items-center justify-center transition-colors"
					>
						<Bookmark className="w-4 h-4" />
					</button>

					<button
						onClick={onShare}
						className="bg-white border border-gray-300 hover:bg-gray-50 p-2 rounded-lg flex items-center justify-center transition-colors"
					>
						<Share2 className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Scrollable Content Area */}
			<div className="flex-1 min-h-0 flex flex-col">
				{/* Tabs */}
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full flex h-full flex-col"
				>
					{/* Tab List - Fixed */}
					<div className="p-6 pb-0 flex-shrink-0">
						<TabsList className="grid grid-cols-4 bg-white h-12 p-1 w-[90%]">
							<TabsTrigger
								value="trending"
								className="text-sm data-[state=active]:text-blue-400 data-[state=active]:font-medium data-[state=active]:bg-blue-50 shadow-none data-[state=active]:shadow-none text-gray-500 font-manrope"
							>
								Trending
							</TabsTrigger>
							<TabsTrigger
								value="insights"
								className="text-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium data-[state=active]:bg-blue-50 shadow-none data-[state=active]:shadow-none px-3 text-gray-500 font-manrope"
							>
								Insights
							</TabsTrigger>
							<TabsTrigger
								value="overview"
								className="text-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium data-[state=active]:bg-blue-50 shadow-none data-[state=active]:shadow-none px-3 text-gray-500 font-manrope"
							>
								Overview
							</TabsTrigger>
							<TabsTrigger
								value="nearby"
								className="text-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium data-[state=active]:bg-blue-50 shadow-none data-[state=active]:shadow-none px-3 text-gray-500 font-manrope"
							>
								Nearby
							</TabsTrigger>
						</TabsList>
					</div>

					{/* Scrollable Tab Content */}
					<TabsContent
						value="trending"
						className="flex-1 min-h-0 overflow-y-auto px-6 pb-6"
					>
						<div className="space-y-4 font-inter py-4">
							<h2 className="text-lg font-semibold text-gray-600 font-montserrat ">
								Description
							</h2>
							<div className="text-gray-600 leading-relaxed">
								<p>{restaurant.description}</p>
							</div>
							<div className="space-y-6 flex flex-col items-center">
								{trendingData.map((item, i) => (
									<TrendingCard key={i} {...item} />
								))}
							</div>
						</div>
					</TabsContent>

					<TabsContent
						value="insights"
						className="flex-1 min-h-0 overflow-y-auto px-6 pb-6"
					>
						<div className="space-y-4">
							<PhotoSpots />
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{imagesData.map((image, index) => (
									<ImageItem
										key={image.id}
										src={image.src}
										alt={image.alt}
										index={index}
									/>
								))}
							</div>
						</div>
					</TabsContent>

					<TabsContent
						value="overview"
						className="flex-1 min-h-0 overflow-y-auto px-6 pb-6"
					>
						<div className="bg-white rounded-lg  divide-y divide-gray-100 max-w-lg mx-auto mt-4">
							{infoData.map((item, index) => (
								<InfoItem
									key={index}
									icon={item.icon}
									title={item.title}
									content={item.content}
									actionText={item.actionText}
									actionColor={item.actionColor}
									showExternalLink={item.showExternalLink}
									showChevron={item.showChevron}
									onClick={item.onClick}
								/>
							))}
						</div>
						<div className="max-w-2xl mx-auto space-y-6 ">
							{reviewsData.map((review, index) => (
								<PlaceReview
									key={index}
									userName={review.userName}
									rating={review.rating}
									reviewText={review.reviewText}
									images={review.images}
									showSourceIcon={review.showSourceIcon}
									showExternalLink={review.showExternalLink}
								/>
							))}
						</div>
					</TabsContent>

					<TabsContent
						value="nearby"
						className="flex-1 min-h-0 overflow-y-auto px-6 pb-6"
					>
						<div className="space-y-4 font-inter py-4">
							<h2 className="text-lg font-semibold text-gray-600 font-montserrat ">
								Summary
							</h2>
							<div className="text-gray-600 leading-relaxed">
								<p>
									Enhance your experience at Freedom Park Lagos by
									venturing to nearby attractions such as Tinubu
									Square, Cathedral Church of Christ, Marina, National
									Museum Lagos, and savoring local flavors at
									well-known restaurants like De Tastee Fried Chicken
									Catholic Mission, Iya-Eba Restaurant & Bar.
								</p>
							</div>
							<div className="space-y-6">
								{placesData.map((item, i) => (
									<PlaceCard place={item} key={i} />
								))}
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default PlaceDetails;

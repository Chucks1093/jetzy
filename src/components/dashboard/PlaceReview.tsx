import React, { useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

type PlaceReviewProps = {
	userName: string;
	rating: number;
	reviewText: string;
	images: string[];
	showSourceIcon?: boolean;
	showExternalLink?: boolean;
	className?: string;
	maxTextLength?: number;
};

const PlaceReview: React.FC<PlaceReviewProps> = ({
	userName,
	rating,
	reviewText,
	images,
	showSourceIcon = true,
	showExternalLink = true,
	className = '',
	maxTextLength = 150,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
				}`}
			/>
		));
	};

	const shouldTruncate = reviewText.length > maxTextLength;
	const displayText =
		isExpanded || !shouldTruncate
			? reviewText
			: `${reviewText.slice(0, maxTextLength)}...`;

	return (
		<div className={`bg-white p-6 rounded-lg  ${className}`}>
			{/* Header */}
			<div className="flex items-start justify-between mb-4">
				<div>
					<h3 className="font-medium text-gray-900 mb-2">{userName}</h3>
					<div className="flex items-center gap-1">
						{renderStars(rating)}
					</div>
				</div>

				{/* Action Icons */}
				<div className="flex items-center gap-2">
					{showSourceIcon && (
						<button className="p-1 hover:bg-gray-100 rounded transition-colors">
							<img
								src="/icons/google.svg"
								className="w-5 h-5 text-blue-600"
							/>
						</button>
					)}
					{showExternalLink && (
						<button className="p-1 hover:bg-gray-100 rounded transition-colors">
							<ExternalLink className="w-4 h-4 text-gray-600" />
						</button>
					)}
				</div>
			</div>

			{/* Review Text */}
			<div className="mb-4">
				<p className="text-gray-700 text-sm leading-relaxed">
					{displayText}
				</p>

				{shouldTruncate && (
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700 transition-colors"
					>
						{isExpanded ? 'Show less' : 'Show more'}
					</button>
				)}
			</div>

			{/* Image Carousel */}
			{images.length > 0 && (
				<div className="relative">
					<Carousel className="w-full">
						<CarouselContent>
							{images.map((image, index) => (
								<CarouselItem
									key={index}
									className="basis-1/3 md:basis-1/4"
								>
									<div className="aspect-square overflow-hidden rounded-lg">
										<img
											src={image}
											alt={`Review image ${index + 1}`}
											className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-2" />
						<CarouselNext className="right-2" />
					</Carousel>
				</div>
			)}
		</div>
	);
};

export default PlaceReview;

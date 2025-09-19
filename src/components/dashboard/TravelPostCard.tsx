import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Heart, MessageCircle } from 'lucide-react';
interface TravelPost {
	id: string;
	title: string;
	images: string[];
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

export default function TravelPostCard({ post }: TravelPostCardProps) {
	const [isLiked, setIsLiked] = useState(post.isLiked || false);
	const [likeCount, setLikeCount] = useState(post.likes);

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
	};

	return (
		<div className="border border-zinc-200 rounded-md">
			{post.images.length > 0 && (
				<div className="relative ">
					<Carousel className="w-full">
						<CarouselContent>
							{post.images.map((image, index) => (
								<CarouselItem key={index}>
									<div className="aspect-square overflow-hidden h-[15rem] w-full">
										<img
											src={image}
											alt={`Review image ${index + 1}`}
											className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200 rounded-t-lg"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						{post.images.length > 1 && (
							<>
								<CarouselPrevious className="left-2" />
								<CarouselNext className="right-2" />
							</>
						)}
					</Carousel>
				</div>
			)}

			<div className="p-4">
				<h3 className="font-medium text-lg text-zinc-700 font-grotesque  text-balance mb-3 line-clamp-2">
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
						<button
							onClick={handleLike}
							className="flex items-center gap-1 text-muted-foreground hover:text-primary p-1"
						>
							<Heart
								className={`size-5 stroke-0 ${
									isLiked ? 'fill-red-500 text-primary' : ''
								}`}
							/>
							<span className="text-sm">{likeCount}</span>
						</button>

						<button className="flex items-center gap-1 text-muted-foreground hover:text-primary p-1">
							<MessageCircle className="size-5" />
							<span className="text-sm">{post.comments}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

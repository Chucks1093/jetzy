import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircleMore } from 'lucide-react';
type TrendingCardProps = {
	className?: string;
	image: string;
	authorImage: string;
	authorName: string;
	likes: number;
	comments: number;
	description: string;
};

const TrendingCard: React.FC<TrendingCardProps> = props => {
	const getAvatarColor = (name: string) => {
		const colors = [
			'bg-red-500',
			'bg-blue-500',
			'bg-green-500',
			'bg-yellow-500',
			'bg-purple-500',
			'bg-pink-500',
			'bg-indigo-500',
			'bg-teal-500',
			'bg-orange-500',
			'bg-cyan-500',
			'bg-lime-500',
			'bg-amber-500',
			'bg-emerald-500',
			'bg-violet-500',
			'bg-rose-500',
			'bg-sky-500',
		];

		// Use first character's char code to consistently pick a color
		const index = name.charCodeAt(0) % colors.length;
		return colors[index];
	};

	return (
		<article
			className={cn(
				'bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 max-w-sm',
				props.className
			)}
		>
			{/* Main Image */}
			<div className="w-full">
				<img
					src={props.image}
					alt=""
					className="w-full h-64 object-cover"
				/>
			</div>

			{/* Content Section */}
			<div className="p-4 space-y-3">
				{/* Description */}
				<p className="line-clamp-2 text-sm leading-relaxed text-gray-800">
					{props.description}
				</p>

				{/* Author and Actions Row */}
				<div className="flex items-center justify-between pt-1">
					{/* Author Info */}
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage src={props.authorImage} alt="Author Avatar" />
							<AvatarFallback
								className={`${getAvatarColor(
									props.authorName
								)} text-white font-medium text-sm`}
							>
								{props.authorName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<p className="text-sm font-medium text-gray-700">
							{props.authorName}
						</p>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<Heart fill="red" className="w-5 h-5 text-gray-600" />
							<p className="text-sm text-gray-600">{props.likes}</p>
						</div>
						<div className="flex items-center gap-1">
							<MessageCircleMore className="w-5 h-5 text-gray-600" />
							<p className="text-sm text-gray-600">{props.comments}</p>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default TrendingCard;

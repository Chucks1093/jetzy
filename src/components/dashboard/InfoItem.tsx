import {
	MapPin,
	Phone,
	Globe,
	Clock,
	ExternalLink,
	ChevronRight,
} from 'lucide-react';

export type InfoItemProps = {
	icon: 'address' | 'phone' | 'website' | 'hours';
	title: string;
	content: string;
	actionText: string;
	actionColor?: 'blue' | 'green' | 'purple' | 'gray';
	showExternalLink?: boolean;
	showChevron?: boolean;
	onClick?: () => void;
};

const InfoItem: React.FC<InfoItemProps> = ({
	icon,
	title,
	content,
	actionText,
	actionColor = 'blue',
	showExternalLink = false,
	showChevron = false,
	onClick,
}) => {
	const iconMap = {
		address: MapPin,
		phone: Phone,
		website: Globe,
		hours: Clock,
	};

	const IconComponent = iconMap[icon];

	const colorMap = {
		blue: 'bg-blue-500 hover:bg-blue-600 text-white',
		green: 'bg-green-500 hover:bg-green-600 text-white',
		purple: 'bg-purple-500 hover:bg-purple-600 text-white',
		gray: 'bg-gray-500 hover:bg-gray-600 text-white',
	};

	return (
		<div className="flex items-start gap-3 py-4 px-4 cursor-pointer hover:bg-gray-50 rounded-xl">
			{/* Icon */}
			<div className="flex-shrink-0 mt-1">
				<IconComponent className="w-5 h-5 text-zinc-500" />
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<h3 className="font-medium text-zince-800 mb-1 font-manrope">
					{title}
				</h3>
				<p className="text-xs leading-relaxed text-gray-500 italic">
					{content}
				</p>
			</div>

			{/* Action Button */}
			<div className="flex-shrink-0 flex items-center gap-2">
				<button
					onClick={onClick}
					className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${colorMap[actionColor]}`}
				>
					{actionText}
				</button>

				{showExternalLink && (
					<ExternalLink className="w-5 h-5 text-gray-400" />
				)}

				{showChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
			</div>
		</div>
	);
};

// Example usage with data array
export default InfoItem;

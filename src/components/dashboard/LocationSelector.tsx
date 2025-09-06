import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

// Types
interface Location {
	id: string;
	name: string;
	region: string;
	country: string;
	image: string;
	fullName: string;
}

// New York locations data
const locations: Location[] = [
	{
		id: '1',
		name: 'Manhattan',
		region: 'New York',
		country: 'United States',
		image: '/images/image-1.jpg',
		fullName: 'Manhattan, New York, United States',
	},
	{
		id: '2',
		name: 'Brooklyn',
		region: 'New York',
		country: 'United States',
		image: '/images/image-2.jpg',
		fullName: 'Brooklyn, New York, United States',
	},
	{
		id: '3',
		name: 'Times Square',
		region: 'Manhattan, NY',
		country: 'United States',
		image: '/images/image-3.jpg',
		fullName: 'Times Square, Manhattan, NY, United States',
	},
	{
		id: '4',
		name: 'SoHo',
		region: 'Manhattan, NY',
		country: 'United States',
		image: '/images/image-4.jpg',
		fullName: 'SoHo, Manhattan, NY, United States',
	},
	{
		id: '5',
		name: 'Williamsburg',
		region: 'Brooklyn, NY',
		country: 'United States',
		image: '/images/image-5.jpg',
		fullName: 'Williamsburg, Brooklyn, NY, United States',
	},
	{
		id: '6',
		name: 'Central Park',
		region: 'Manhattan, NY',
		country: 'United States',
		image: '/images/image-6.jpg',
		fullName: 'Central Park, Manhattan, NY, United States',
	},
	{
		id: '7',
		name: 'Queens',
		region: 'New York',
		country: 'United States',
		image: '/images/image-7.jpg',
		fullName: 'Queens, New York, United States',
	},
];

interface LocationSelectorProps {
	className?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
	className = '',
}) => {
	const [currentLocation, setCurrentLocation] = useState<Location>(
		locations[0]
	); // Default to Manhattan
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleLocationSelect = (location: Location): void => {
		setCurrentLocation(location);
		setIsOpen(false);
	};

	return (
		<div className={`inline-block ${className}`}>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<button
						type="button"
						className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
					>
						<MapPin className="h-4 w-4 text-gray-500" />
						<span className="font-medium">{currentLocation.name}</span>
						<ChevronDown
							className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
								isOpen ? 'rotate-180' : ''
							}`}
						/>
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-64 p-0" align="start">
					<Command>
						<CommandInput placeholder="Search NYC locations..." />
						<CommandList>
							<CommandEmpty>No NYC locations found.</CommandEmpty>
							<CommandGroup>
								{locations.map(location => (
									<CommandItem
										key={location.id}
										onSelect={() => handleLocationSelect(location)}
										className="flex items-center gap-2 px-2 py-2"
									>
										<img
											src={location.image}
											alt={location.name}
											className="w-8 h-8 rounded object-cover flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<div className="font-medium text-sm truncate">
												{location.name}
											</div>
											<div className="text-xs text-muted-foreground truncate">
												{location.region && `${location.region}, `}
												{location.country}
											</div>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default LocationSelector;

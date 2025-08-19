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

// Sample location data
const locations: Location[] = [
	{
		id: '1',
		name: 'Lagos',
		region: 'Lagos State',
		country: 'Nigeria',
		image: '/locations/beach.jpg',
		fullName: 'Lagos, Lagos State, Nigeria',
	},
	{
		id: '2',
		name: 'Lagos',
		region: '',
		country: 'Portugal',
		image: '/locations/beach.jpg',
		fullName: 'Lagos, Portugal',
	},
	{
		id: '3',
		name: 'Ikeja',
		region: 'Lagos State',
		country: 'Nigeria',
		image: '/locations/beach.jpg',
		fullName: 'Ikeja, Lagos State, Nigeria',
	},
	{
		id: '4',
		name: 'Frutillar',
		region: 'Los Lagos Region',
		country: 'Chile',
		image: '/locations/water-fall.jpg',
		fullName: 'Frutillar, Los Lagos Region, Chile',
	},
	{
		id: '5',
		name: 'Osorno',
		region: 'Los Lagos Region',
		country: 'Chile',
		image: '/locations/water-fall.jpg',
		fullName: 'Osorno, Los Lagos Region, Chile',
	},
	{
		id: '6',
		name: 'Abuja',
		region: 'Federal Capital Territory',
		country: 'Nigeria',
		image: '/locations/water-fall.jpg',
		fullName: 'Abuja, Federal Capital Territory, Nigeria',
	},
	{
		id: '7',
		name: 'Port Harcourt',
		region: 'Rivers State',
		country: 'Nigeria',
		image: '/locations/water-fall.jpg',
		fullName: 'Port Harcourt, Rivers State, Nigeria',
	},
];

interface LocationSelectorProps {
	className?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
	className = '',
}) => {
	const [currentLocation, setCurrentLocation] = useState<Location>(
		locations[2]
	); // Default to Ikeja
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
						<CommandInput placeholder="Search locations..." />
						<CommandList>
							<CommandEmpty>No locations found.</CommandEmpty>
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

import FormInput from '@/components/shared/FormInput';
import {
	Clock,
	GalleryVerticalEnd,
	MoreHorizontal,
	Plus,
	SearchIcon,
	TrashIcon,
	X,
	Trash2,
	Archive,
	Share,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

// SelectedItemsFooter Component
interface SelectedItemsFooterProps {
	selectedCount: number;
	onDelete: () => void;
	onArchive?: () => void;
	onShare?: () => void;
	onClear: () => void;
	itemType?: string;
	isVisible: boolean;
}

const SelectedItemsFooter: React.FC<SelectedItemsFooterProps> = ({
	selectedCount,
	onDelete,
	onArchive,
	onShare,
	onClear,
	itemType = 'items',
	isVisible,
}) => {
	if (!isVisible || selectedCount === 0) return null;

	return (
		<>
			<div className="absolute bottom-0 left-1/2 right-0 -translate-x-1/2 z-50 bg-gray-900 border-t border-gray-700 transform transition-transform duration-300 ease-out w-full max-w-2xl mb-4 rounded-4xl ">
				<div className=" mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button
								onClick={onClear}
								className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full transition-colors"
								title="Clear selection"
							>
								<X className="size-5" />
							</button>
							<div className="text-white font-medium">
								<span className="text-lg">{selectedCount}</span>
								<span className="ml-1 text-gray-300">
									{selectedCount === 1
										? itemType.slice(0, -1)
										: itemType}{' '}
									selected
								</span>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							{onShare && (
								<button
									onClick={onShare}
									className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
								>
									<Share size={16} />
									<span>Share</span>
								</button>
							)}

							{onArchive && (
								<button
									onClick={onArchive}
									className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium"
								>
									<Archive size={16} />
									<span>Archive</span>
								</button>
							)}

							<button
								onClick={onDelete}
								className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
							>
								<Trash2 size={16} />
								<span>
									Delete {selectedCount}{' '}
									{selectedCount === 1
										? itemType.slice(0, -1)
										: itemType}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

interface ChatItem {
	id: string;
	title: string;
	description: string;
	updatedAt: string;
}

interface ChatHistoryItemProps extends ChatItem {
	onSelect: (id: string) => void;
	isSelected: boolean;
	onDelete?: (id: string) => void;
	onAddToSpace?: (id: string) => void;
}

const chatItems: ChatItem[] = [
	{
		id: 'chat_001',
		title: 'Paris Honeymoon Planning',
		description:
			"A comprehensive honeymoon planning session for a romantic 7-day Paris getaway that began with budget considerations and evolved into detailed itinerary creation. We explored luxury hotel options in the 7th arrondissement, comparing boutique properties like Hotel des Invalides with grand establishments such as Hotel Plaza Athénée, analyzing amenities, location benefits, and romantic packages. The conversation covered flight booking strategies, including optimal departure times, airline loyalty programs, and seat selection preferences for comfort during the transatlantic journey. We discussed seasonal considerations for visiting Paris, weather patterns, tourist crowds, and how to time the visit for both pleasant weather and cultural events. Restaurant reservations became a major focus, exploring Michelin-starred establishments like L'Ambroisie and Le Meurice, along with charming bistros and cafés for authentic Parisian dining experiences. The planning included romantic activities such as Seine river cruises, private Louvre tours, sunset visits to the Eiffel Tower, and day trips to Versailles. We also covered practical considerations like travel insurance, currency exchange, local transportation passes, and essential French phrases for enhanced cultural immersion.",
		updatedAt: '2025-09-19T14:30:00Z',
	},
	{
		id: 'chat_002',
		title: 'Business Travel to Tokyo',
		description:
			'An extensive business travel coordination session for a multi-city Japan itinerary spanning Tokyo, Osaka, and Kyoto over 10 days. We started with corporate travel policy compliance, exploring approved hotel chains and understanding per diem allowances while maximizing comfort and convenience. The discussion covered optimal flight routing through major hubs, comparing direct versus connecting flights, and strategies for minimizing jet lag through strategic scheduling and seat selection. Hotel selection focused on business-friendly properties near conference centers and transportation hubs, evaluating amenities like business centers, reliable WiFi, and proximity to meeting locations. We explored Japan Rail Pass options for efficient intercity travel, local transportation systems including Tokyo Metro and JR lines, and mobile payment solutions for convenient navigation. Restaurant recommendations balanced business dining requirements with cultural experiences, identifying venues suitable for client entertainment and solo dining options for exploring authentic Japanese cuisine. The conversation also addressed cultural etiquette, business card protocols, appropriate attire for meetings, and language considerations. Additional planning covered travel insurance for business trips, expense tracking methods, and strategies for staying productive during long flights.',
		updatedAt: '2025-09-18T09:15:00Z',
	},
	{
		id: 'chat_003',
		title: 'Family Caribbean Cruise Planning',
		description:
			'A detailed family vacation planning session for a 7-night Caribbean cruise accommodating two adults and three children ages 8, 12, and 15. We began with cruise line comparisons, evaluating family-friendly options like Disney Cruise Line, Royal Caribbean, and Norwegian, analyzing kid-friendly amenities, teen programs, and adult relaxation areas. The discussion covered cabin selection strategies, comparing interior, oceanview, and balcony options while considering family size and budget constraints. We explored shore excursion planning for each port of call, identifying age-appropriate activities that would engage all family members, from snorkeling in Cozumel to historical tours in Nassau. Dining arrangements became a focus, understanding specialty restaurant reservations, dietary accommodations for children, and flexible dining options that work with varying schedules. The conversation covered pre-cruise planning including travel to the departure port, parking options, luggage strategies, and check-in procedures to minimize stress. We discussed onboard activities for different age groups, pool areas, entertainment schedules, and strategies for keeping teenagers engaged while ensuring younger children have appropriate supervision. Additional considerations included travel insurance for families, medical facilities onboard, seasickness prevention, and budget planning for onboard expenses and excursions.',
		updatedAt: '2025-09-17T16:45:00Z',
	},
	{
		id: 'chat_004',
		title: 'Solo Backpacking Through Europe',
		description:
			'An comprehensive solo travel planning session for a month-long backpacking adventure through 8 European countries including Germany, Netherlands, Belgium, France, Switzerland, Italy, Austria, and Czech Republic. We started with budget optimization strategies, exploring hostel networks, train pass options, and cost-effective routing to maximize experiences while minimizing expenses. The discussion covered accommodation variety from budget hostels to boutique guesthouses, evaluating safety considerations for solo travelers, social opportunities for meeting fellow travelers, and location proximity to major attractions and transportation hubs. Transportation planning became central, comparing Eurail pass benefits with point-to-point tickets, understanding reservation requirements, and strategic routing to optimize travel times and costs. We explored packing strategies for extended backpacking, weather considerations across different regions and seasons, and essential gear recommendations for comfort and safety. Food experiences were thoroughly discussed, from street food discoveries to local market explorations, cooking facilities in hostels, and must-try regional specialties in each country. The conversation covered safety protocols for solo travelers, emergency contacts, travel insurance considerations, and communication strategies for staying connected with family. Additional planning included cultural research for each destination, language basics, currency considerations, and strategies for documenting the journey through photography and journaling.',
		updatedAt: '2025-09-16T11:20:00Z',
	},
	{
		id: 'chat_005',
		title: 'Luxury Safari in Kenya',
		description:
			'An exclusive luxury safari planning session for a once-in-a-lifetime Kenya adventure focusing on the Masai Mara, Amboseli, and Tsavo National Parks during the Great Migration season. We began with luxury lodge comparisons, evaluating properties like Angama Mara, Ol Donyo Lodge, and Finch Hattons, analyzing their conservation efforts, accommodation styles, and unique wildlife viewing opportunities. The discussion covered optimal timing for the Great Migration, weather patterns, and seasonal wildlife behaviors to maximize game viewing experiences. Transportation logistics included international flights to Nairobi, domestic charter flights between parks, and ground transportation options with experienced local guides and naturalists. We explored specialized safari activities beyond traditional game drives, including walking safaris, night drives, bird watching expeditions, and cultural interactions with Masai communities. Photography considerations became important, discussing equipment recommendations, charging solutions in remote locations, and strategies for capturing memorable wildlife moments. The conversation covered health preparations including required vaccinations, malaria prevention, and travel insurance for remote locations. Packing strategies focused on appropriate clothing for varying climates, photography equipment protection, and essential items for luxury bush experiences. Additional planning included conservation education opportunities, responsible tourism practices, and ways to support local communities and wildlife protection efforts.',
		updatedAt: '2025-09-15T13:55:00Z',
	},
	{
		id: 'chat_006',
		title: 'Mountain Retreat in Switzerland',
		description:
			'A detailed mountain vacation planning session for a rejuvenating Swiss Alps retreat in the Jungfrau region, focusing on wellness, outdoor activities, and scenic beauty during the summer hiking season. We explored luxury mountain resort options in Grindelwald, Wengen, and Lauterbrunnen, comparing spa facilities, mountain access, and panoramic viewing opportunities from properties like Victoria Jungfrau and Hotel Silberhorn. The discussion covered hiking trail selection for various fitness levels, from gentle valley walks to challenging peak ascents, including proper equipment recommendations and guided tour options. Transportation planning included scenic railway journeys on the Jungfraujoch, cable car systems, and regional train passes for exploring the broader Bernese Oberland region. We discussed seasonal activities beyond hiking, including mountain biking, paragliding opportunities, alpine slide experiences, and traditional Swiss cultural activities like cheese making workshops. Accommodation features became important, analyzing rooms with mountain views, spa amenities, fitness facilities, and dining options featuring local Alpine cuisine. The conversation covered weather considerations for mountain travel, appropriate clothing layers, rain gear recommendations, and strategies for dealing with altitude changes. Health and wellness aspects included spa treatments, yoga classes, meditation opportunities, and how mountain air and scenery contribute to relaxation and stress relief. Additional planning involved photography opportunities for capturing mountain landscapes, local shopping for Swiss specialties, and sustainable tourism practices in sensitive alpine environments.',
		updatedAt: '2025-09-14T08:30:00Z',
	},
	{
		id: 'chat_007',
		title: 'Food Tour Through Italy',
		description:
			"An extensive culinary journey planning session through Italy's most renowned food regions, including Tuscany, Emilia-Romagna, Campania, and Sicily over 14 days. We began with regional specialties research, understanding the distinct culinary traditions of each area from Tuscan wines and olive oils to Sicilian street food and seafood. The discussion covered cooking class opportunities with local chefs, market tours with food experts, and wine tasting experiences at family-owned vineyards and estates. Accommodation selection focused on agriturismo properties, boutique hotels with cooking facilities, and locations that provided authentic local experiences while maintaining comfort standards. Restaurant reservations became crucial, identifying must-visit establishments from Michelin-starred venues to hidden local trattorias, understanding reservation procedures and cultural dining customs. Transportation planning included rental car logistics for exploring rural wine regions, train travel between major cities, and local transportation for food market visits and restaurant access. We explored food festival timing, seasonal ingredient availability, and how to plan the itinerary around harvest seasons and regional celebrations. The conversation covered food safety considerations, dietary restrictions communication in Italian, and strategies for managing rich cuisine consumption over extended periods. Additional planning included food photography techniques, ingredient purchasing for bringing flavors home, cooking equipment recommendations for hands-on experiences, and ways to document recipes and techniques learned during the journey.",
		updatedAt: '2025-09-13T15:10:00Z',
	},
	{
		id: 'chat_008',
		title: 'Adventure Sports in New Zealand',
		description:
			"A comprehensive adventure travel planning session for an adrenaline-packed New Zealand expedition covering both North and South Islands over 3 weeks. We started with activity selection and scheduling, coordinating bungee jumping in Queenstown, skydiving over Lake Taupo, whitewater rafting on the Shotover River, and glacier hiking on Franz Josef. The discussion covered adventure tour operator comparisons, safety certifications, insurance requirements, and physical fitness preparations needed for various activities. Accommodation strategy focused on adventure-friendly lodging from backpacker hostels to luxury lodges, evaluating location access to activity sites, equipment storage, and recovery amenities after intense physical activities. Transportation planning included campervan rental considerations, public transport options, and domestic flight routing to maximize adventure opportunities while minimizing travel time. We explored seasonal weather impacts on adventure activities, equipment recommendations, and clothing strategies for varying climates from subtropical north to alpine south. The conversation covered safety protocols, emergency procedures, travel insurance specifically covering adventure sports, and health considerations for high-intensity activities. Photography planning included action camera recommendations, equipment protection during activities, and strategies for capturing adventure moments while maintaining safety focus. Additional considerations involved rest day planning for recovery, alternative activities for weather contingencies, cultural experiences between adventure activities, and sustainable tourism practices to protect New Zealand's pristine natural environments.",
		updatedAt: '2025-09-12T10:25:00Z',
	},
	{
		id: 'chat_009',
		title: 'Cultural Immersion in Morocco',
		description:
			'An in-depth cultural travel planning session for an authentic Moroccan experience covering Marrakech, Fes, the Sahara Desert, and coastal Essaouira over 12 days. We began with accommodation diversity planning, from traditional riads in medina quarters to luxury desert camps, evaluating cultural authenticity, comfort levels, and unique architectural experiences. The discussion covered guided tour selection for navigating complex medinas, understanding local customs, and accessing hidden cultural gems not typically available to independent travelers. Transportation logistics included domestic flights, private drivers for desert excursions, and local transportation methods for authentic city exploration. We explored cultural activity planning including traditional craft workshops like carpet weaving and pottery, cooking classes focusing on tagines and local spices, and music and dance performances in authentic settings. The conversation covered appropriate dress codes respecting local customs, cultural sensitivity guidelines, and language basics for enhanced local interactions. Food exploration became significant, discussing street food safety, traditional restaurant etiquette, and dietary considerations while experiencing authentic Moroccan cuisine. Desert excursion planning included camel trekking logistics, overnight camping experiences, stargazing opportunities, and Berber cultural interactions. Additional considerations involved shopping strategies for traditional crafts, bargaining customs, currency exchange, photography etiquette regarding local people and sacred spaces, and health preparations including recommended vaccinations and travel insurance for North African travel.',
		updatedAt: '2025-09-11T17:40:00Z',
	},
	{
		id: 'chat_010',
		title: 'Beach Resort in Maldives',
		description:
			'A luxury tropical vacation planning session for an ultimate Maldives resort experience featuring overwater bungalows, world-class diving, and complete relaxation over 8 days. We started with resort selection among premium properties like Soneva Jani, Four Seasons Landaa Giraavaru, and Conrad Maldives, comparing overwater villa features, reef access, and exclusive amenities. The discussion covered seaplane transfer logistics, luggage restrictions for domestic flights, and arrival coordination to maximize resort time. Accommodation features analysis included private pools, direct ocean access, butler services, and romantic amenities for special celebrations. We explored underwater activity planning including snorkeling excursions, scuba diving certification courses, dolphin watching trips, and sunset fishing experiences. Spa and wellness planning became central, discussing signature treatments, couples massages, yoga sessions, and how tropical environments enhance relaxation experiences. Dining experiences covered all-inclusive versus à la carte options, underwater restaurant reservations, private beach dinners, and special dietary accommodations. The conversation addressed seasonal weather patterns, optimal timing for diving conditions, and how to plan around potential weather disruptions. Photography planning included underwater camera equipment, drone regulations, and strategies for capturing tropical paradise moments. Additional considerations involved sustainable tourism practices in fragile coral ecosystems, local culture respect in Muslim communities, travel insurance for water activities, and packing strategies for tropical climates with luxury resort dress codes.',
		updatedAt: '2025-09-10T12:05:00Z',
	},
];

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
};

const ChatHistoryItem = (props: ChatHistoryItemProps) => {
	const handleAddToSpace = () => {
		props.onAddToSpace?.(props.id);
	};

	const handleDelete = () => {
		props.onDelete?.(props.id);
	};

	return (
		<div className="  max-w-3xl flex gap-2">
			<Checkbox
				checked={props.isSelected}
				onCheckedChange={() => props.onSelect(props.id)}
				className="size-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 mt-3"
			/>
			<div className="group cursor-pointer">
				<div className="flex items-center gap-2">
					<h1 className="text-xl font-medium font-manrope text-zinc-900 group-hover:text-blue-600">
						{props.title}
					</h1>
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="ml-auto">
							<button className="hidden md:inline-flex items-center px-4 py-2.5 text-sm font-medium text-center bg-transparent rounded-sm data-[state=open]:bg-gray-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 h-[2.8rem] text-zinc-600">
								<MoreHorizontal />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-48">
							<DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase">
								Options
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={handleAddToSpace}
							>
								<Plus className="mr-2 h-4 w-4" />
								<p>Add to Space</p>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer text-red-600"
								onClick={handleDelete}
							>
								<TrashIcon className="mr-2 h-4 w-4" />
								<p>Delete</p>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<p className="line-clamp-3 overflow-ellipsis text-gray-500">
					{props.description}
				</p>
				<div className="flex items-center gap-1 mt-5 text-sm text-gray-500">
					<Clock className="size-4" />
					<p>{formatDate(props.updatedAt)}</p>
				</div>
			</div>
		</div>
	);
};

export default function TravelChatHistory() {
	const [selectedChats, setSelectedChats] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [chats, setChats] = useState<ChatItem[]>(chatItems);

	// Filter chats based on search query
	const filteredChats = useMemo(() => {
		if (!searchQuery.trim()) return chats;

		const query = searchQuery.toLowerCase();
		return chats.filter(
			chat =>
				chat.title.toLowerCase().includes(query) ||
				chat.description.toLowerCase().includes(query)
		);
	}, [chats, searchQuery]);

	// Handle individual chat selection
	const handleChatSelect = (id: string) => {
		setSelectedChats(prev =>
			prev.includes(id)
				? prev.filter(chatId => chatId !== id)
				: [...prev, id]
		);
	};

	// Select/Deselect all filtered chats
	const selectAll = () => {
		const filteredChatIds = filteredChats.map(chat => chat.id);
		const allSelected = filteredChatIds.every(id =>
			selectedChats.includes(id)
		);

		if (allSelected) {
			// Deselect all filtered chats
			setSelectedChats(prev =>
				prev.filter(id => !filteredChatIds.includes(id))
			);
		} else {
			// Select all filtered chats
			const newSelections = filteredChatIds.filter(
				id => !selectedChats.includes(id)
			);
			setSelectedChats(prev => [...prev, ...newSelections]);
		}
	};

	// Delete selected chats
	const deleteSelected = () => {
		setChats(prev => prev.filter(chat => !selectedChats.includes(chat.id)));
		setSelectedChats([]);
	};

	// Handle individual chat deletion
	const handleDeleteChat = (id: string) => {
		setChats(prev => prev.filter(chat => chat.id !== id));
		setSelectedChats(prev => prev.filter(chatId => chatId !== id));
	};

	// Handle add to space
	const handleAddToSpace = (id: string) => {
		console.log(`Adding chat ${id} to space`);
		// Implement your add to space logic here
	};

	// Clear search
	const clearSearch = () => {
		setSearchQuery('');
	};

	const selectedFromFiltered = selectedChats.filter(id =>
		filteredChats.some(chat => chat.id === id)
	).length;

	return (
		<>
			<div className="h-screen bg-[#faf9f6] text-gray-900 max-w-6xl mx-auto pt-13 px-4 flex flex-col relative">
				<SelectedItemsFooter
					selectedCount={selectedFromFiltered}
					onDelete={deleteSelected}
					onArchive={() => console.log('Archive selected chats')}
					onShare={() => console.log('Share selected chats')}
					onClear={() => setSelectedChats([])}
					itemType="chats"
					isVisible={selectedFromFiltered > 0}
				/>
				<div className="flex gap-2 items-center mb-4">
					<GalleryVerticalEnd />
					<h1 className="text-2xl font-manrope font-medium text-zinc-600">
						Your chat history
					</h1>
				</div>

				<div className="">
					<FormInput
						label=""
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder="Search travel tips, posts and more"
						prefix={<SearchIcon className="size-5 text-zinc-600" />}
						inputClassName="h-12"
						className="max-w-3xl"
						wrapperClassName="px-3 rounded-lg border-gray-400"
					/>

					<div className="mt-5">
						<div className="flex items-center justify-between mb-2">
							<p className="text-zinc-600 font-grotesque">
								You have {chats.length} previous chats with Jetzy
							</p>
							{filteredChats.length > 0 && (
								<button
									onClick={selectAll}
									className="text-blue-600 hover:underline text-md font-grotesque underline"
								>
									Select All
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Results */}
				<div
					className={`overflow-y-auto space-y-10 pr-2 flex-1 mt-4 ${
						selectedFromFiltered > 0 ? 'pb-20' : ''
					}`}
				>
					{filteredChats.length === 0 ? (
						<div className="text-center text-gray-500 mt-8">
							{searchQuery ? (
								<>
									<p>No chats found matching "{searchQuery}"</p>
									<button
										onClick={clearSearch}
										className="mt-2 text-blue-600 hover:underline"
									>
										Clear search to see all chats
									</button>
								</>
							) : (
								<p>No chats available</p>
							)}
						</div>
					) : (
						filteredChats.map(chat => (
							<ChatHistoryItem
								key={chat.id}
								{...chat}
								isSelected={selectedChats.includes(chat.id)}
								onSelect={handleChatSelect}
								onDelete={handleDeleteChat}
								onAddToSpace={handleAddToSpace}
							/>
						))
					)}
				</div>
			</div>

			{/* Fixed Bottom Footer */}
		</>
	);
}

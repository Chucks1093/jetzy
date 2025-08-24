import React, { useState, useRef } from 'react';
import {
	ArrowUp,
	Plus,
	Search,
	Settings2,
	Compass,
	Utensils,
	Hotel,
	Mic,
	Upload,
	FileText,
	MapPin,
	ChevronDown,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Types
interface Place {
	id: string;
	name: string;
	address: string;
	image: string;
	shortName: string;
}

// Data
const places: Place[] = [
	{
		id: '1',
		name: 'Eko Hotel And Suites',
		address:
			'1415 Adetokunbo Ademola Street, Victoria Island, Lagos 106104, Lagos, Nigeria',
		image: '/locations/china.jpg',
		shortName: 'Eko Hotel',
	},
	{
		id: '2',
		name: 'Radisson Blu Anchorage Hotel',
		address:
			'1a Ozumba Mbadiwe Ave, Victoria Island, Lagos 101241, Lagos, Nigeria',
		image: '/locations/china.jpg',
		shortName: 'Radisson Anchorage',
	},
	{
		id: '3',
		name: 'Lagos Oriental Hotel',
		address:
			'3 Lekki - Epe Expy, Victoria Island, Lagos 106104, Lagos, Nigeria',
		image: '/locations/china.jpg',
		shortName: 'Oriental Hotel',
	},
	{
		id: '4',
		name: 'Lagos Continental Hotel',
		address:
			'52a Kofo Abayomi St, Victoria Island, Lagos 101241, Lagos, Nigeria',
		image: '/locations/china.jpg',
		shortName: 'Continental Hotel',
	},
	{
		id: '5',
		name: 'Radisson Blu Hotel Lagos Ikeja',
		address: '38-40 Isaac John St, Ikeja GRA, Lagos 100271, Lagos, Nigeria',
		image: '/locations/china.jpg',
		shortName: 'Radisson Ikeja',
	},
];

// Components
interface ActionIconProps {
	action: string;
}

const ActionIcon: React.FC<ActionIconProps> = ({ action }) => {
	const getImage = () => {
		switch (action) {
			case 'plan':
				return '/gifs/plan-trip.gif'; // Replace with your planning GIF
			case 'book':
				return '/gifs/book-hotel.gif'; // Replace with your booking GIF
			default:
				return '/gifs/plan-trip.gif'; // Default planning GIF
		}
	};

	const getAltText = () => {
		switch (action) {
			case 'plan':
				return 'Planning a trip';
			case 'book':
				return 'Booking a hotel';
			default:
				return 'Planning a trip';
		}
	};

	const getTooltip = () => {
		switch (action) {
			case 'plan':
				return 'Planning a trip';
			case 'book':
				return 'Booking a hotel';
			default:
				return 'Planning a trip';
		}
	};

	return (
		<div
			className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 overflow-hidden"
			title={getTooltip()}
		>
			<img
				src={getImage()}
				alt={getAltText()}
				className="w-8 h-8 rounded-full object-cover"
			/>
		</div>
	);
};

interface FileUploadDialogProps {
	onContentAdd: (content: string) => void;
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
	onContentAdd,
}) => {
	const [fileUrl, setFileUrl] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileContent, setFileContent] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleFileSelect = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setFileUrl('');
		}
	};

	const handleGetContent = async (): Promise<void> => {
		setIsLoading(true);
		try {
			if (selectedFile) {
				const reader = new FileReader();
				reader.onload = (e: ProgressEvent<FileReader>) => {
					const result = e.target?.result as string;
					setFileContent(result || '');
					setIsLoading(false);
				};
				reader.readAsText(selectedFile);
			} else if (fileUrl) {
				try {
					const response = await fetch(fileUrl);
					const content = await response.text();
					setFileContent(content);
				} catch (error) {
					setFileContent('Error fetching content from URL');
					console.log(error);
				}
				setIsLoading(false);
			}
		} catch (error) {
			setFileContent('Error processing file');
			setIsLoading(false);
			console.log(error);
		}
	};

	const resetDialog = (): void => {
		setSelectedFile(null);
		setFileUrl('');
		setFileContent('');
		setIsLoading(false);
	};

	return (
		<Dialog onOpenChange={(open: boolean) => !open && resetDialog()}>
			<DialogTrigger asChild>
				<button
					type="button"
					className="rounded-lg h-9 w-9 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
				>
					<Plus className="h-4 w-4" />
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Add Content</DialogTitle>
					<DialogDescription>Upload a file or add a URL</DialogDescription>
				</DialogHeader>
				<div className="space-y-3">
					<div>
						<input
							type="file"
							onChange={handleFileSelect}
							className="hidden"
							id="file-upload"
							accept=".txt,.md,.json,.csv,.xml"
						/>
						<label
							htmlFor="file-upload"
							className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-full"
						>
							<Upload className="h-4 w-4 text-gray-500" />
							<span className="text-sm text-gray-600">
								{selectedFile ? selectedFile.name : 'Choose file'}
							</span>
						</label>
					</div>

					<input
						type="url"
						placeholder="Paste URL here"
						value={fileUrl}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setFileUrl(e.target.value);
							if (e.target.value) setSelectedFile(null);
						}}
						className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>

					<button
						type="button"
						onClick={handleGetContent}
						disabled={(!selectedFile && !fileUrl) || isLoading}
						className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
					>
						<FileText className="h-4 w-4" />
						{isLoading ? 'Processing...' : 'Get Content'}
					</button>

					{fileContent && (
						<div className="space-y-2">
							<div className="p-3 bg-gray-50 border border-gray-200 rounded-lg max-h-24 overflow-y-auto">
								<pre className="text-xs text-gray-600 whitespace-pre-wrap">
									{fileContent.substring(0, 200)}
									{fileContent.length > 200 && '...'}
								</pre>
							</div>
							<button
								type="button"
								onClick={() => onContentAdd('\n\n' + fileContent)}
								className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
							>
								Add to Input
							</button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

interface ToolsDropdownProps {
	onToolAction: (action: string) => void;
	currentAction: string;
}

const ToolsDropdown: React.FC<ToolsDropdownProps> = ({
	onToolAction,
	currentAction,
}) => {
	const getActionLabel = (action: string) => {
		switch (action) {
			case 'plan':
				return 'Plan a trip';
			case 'book':
				return 'Book a hotel';
			default:
				return 'Plan a trip';
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
				>
					<Settings2 className="h-4 w-4 text-gray-500" />
					<span className="text-gray-700 text-sm font-medium">
						{getActionLabel(currentAction)}
					</span>
					<ChevronDown className="h-3 w-3 text-gray-500" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-48">
				<DropdownMenuItem
					onClick={() => onToolAction('plan')}
					className="cursor-pointer"
				>
					<MapPin className="h-4 w-4 mr-2" />
					Plan a trip
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onToolAction('book')}
					className="cursor-pointer"
				>
					<Hotel className="h-4 w-4 mr-2" />
					Book a hotel
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface PlaceItemProps {
	place: Place;
	onClick: (place: Place) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place, onClick }) => (
	<button
		type="button"
		onClick={() => onClick(place)}
		className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
	>
		<img
			src={place.image}
			alt={place.name}
			className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
		/>
		<div className="flex-1 min-w-0">
			<h4 className="font-medium text-gray-900 truncate">{place.name}</h4>
			<p className="text-sm text-gray-500 line-clamp-2">{place.address}</p>
		</div>
	</button>
);

interface PlacesPopoverProps {
	onPlaceSelect: (place: Place) => void;
}

const PlacesPopover: React.FC<PlacesPopoverProps> = ({ onPlaceSelect }) => (
	<Popover>
		<PopoverTrigger asChild>
			<button
				type="button"
				className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
			>
				<Search className="h-4 w-4 text-gray-500" />
				<span className="text-gray-700 text-sm font-medium">Places</span>
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-[80%] p-0" align="start">
			<div className="max-h-80 overflow-y-auto">
				<div className="p-2 border-b border-gray-100">
					<p className="text-xs text-gray-500 px-2">
						Select a place or type @ in the input
					</p>
				</div>
				{places.map(place => (
					<PlaceItem
						key={place.id}
						place={place}
						onClick={onPlaceSelect}
					/>
				))}
			</div>
		</PopoverContent>
	</Popover>
);

interface PlacesDropdownProps {
	filteredPlaces: Place[];
	onPlaceSelect: (place: Place) => void;
	show: boolean;
}

const PlacesDropdown: React.FC<PlacesDropdownProps> = ({
	filteredPlaces,
	onPlaceSelect,
	show,
}) => {
	if (!show) return null;

	return (
		<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50 ml-[52px]">
			{filteredPlaces.length > 0 ? (
				filteredPlaces.map(place => (
					<PlaceItem
						key={place.id}
						place={place}
						onClick={onPlaceSelect}
					/>
				))
			) : (
				<div className="p-3 text-center text-gray-500 text-sm">
					No places found
				</div>
			)}
		</div>
	);
};

interface InputWithHighlightsProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	placeholder?: string;
	currentAction: string;
}

const InputWithHighlights: React.FC<InputWithHighlightsProps> = ({
	value,
	onChange,
	inputRef,
	placeholder = 'How can I help you today?',
	currentAction,
}) => {
	const parts = value.split(/(@\w+)/g);

	return (
		<div className="relative w-full flex items-center gap-3">
			<ActionIcon action={currentAction} />

			<div className="relative flex-1">
				<div className="absolute inset-0 flex items-center pointer-events-none text-lg">
					{parts.map((part, index) => (
						<span
							key={index}
							className={
								part.startsWith('@')
									? 'text-blue-600 font-medium'
									: 'text-transparent'
							}
						>
							{part}
						</span>
					))}
				</div>
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full text-lg text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none focus:placeholder-gray-400 transition-colors relative z-10"
					style={{ color: 'transparent' }}
				/>
				<div className="absolute inset-0 flex items-center pointer-events-none text-lg">
					{parts.map((part, index) => (
						<span
							key={index}
							className={
								part.startsWith('@')
									? 'text-blue-600 font-medium'
									: 'text-gray-800'
							}
						>
							{part}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

const ActionButtons: React.FC = () => (
	<div className="flex justify-center gap-4 mt-6">
		<button
			type="button"
			className="flex items-center gap-2 text-gray-600 rounded-lg border border-gray-200 text-sm px-4 py-2.5 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm"
		>
			<Compass className="h-4 w-4" />
			Wonder
		</button>
		<button
			type="button"
			className="flex items-center gap-2 text-gray-600 rounded-lg border border-gray-200 text-sm px-4 py-2.5 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm"
		>
			<Utensils className="h-4 w-4" />
			Eat
		</button>
		<button
			type="button"
			className="flex items-center gap-2 text-gray-600 rounded-lg border border-gray-200 text-sm px-4 py-2.5 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm"
		>
			<Hotel className="h-4 w-4" />
			Hotels
		</button>
	</div>
);

type AISearchInputProps = {
	className?: string;
};

// Main Component
const AISearchInput: React.FC<AISearchInputProps> = props => {
	const [inputValue, setInputValue] = useState<string>('');
	const [showPlacesDropdown, setShowPlacesDropdown] = useState<boolean>(false);
	const [cursorPosition, setCursorPosition] = useState<number>(0);
	const [mentionQuery, setMentionQuery] = useState<string>('');
	const [currentAction, setCurrentAction] = useState<string>('plan'); // Default to plan a trip
	const inputRef = useRef<HTMLInputElement>(null);

	const handleToolAction = (action: string): void => {
		setCurrentAction(action);
		// Removed automatic text addition - only changes the action indicator
	};

	const handleContentAdd = (content: string): void => {
		setInputValue(prev => prev + content);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		const position = e.target.selectionStart || 0;

		setInputValue(value);
		setCursorPosition(position);

		// Check for @ mention
		const beforeCursor = value.substring(0, position);
		const atIndex = beforeCursor.lastIndexOf('@');

		if (atIndex !== -1) {
			const afterAt = beforeCursor.substring(atIndex + 1);
			if (!afterAt.includes(' ')) {
				setMentionQuery(afterAt);
				setShowPlacesDropdown(true);
			} else {
				setShowPlacesDropdown(false);
			}
		} else {
			setShowPlacesDropdown(false);
		}
	};

	const handlePlaceSelect = (place: Place): void => {
		const beforeCursor = inputValue.substring(0, cursorPosition);
		const afterCursor = inputValue.substring(cursorPosition);
		const atIndex = beforeCursor.lastIndexOf('@');

		if (atIndex !== -1) {
			const beforeAt = beforeCursor.substring(0, atIndex);
			const newValue = `${beforeAt}@${place.shortName}${afterCursor}`;
			setInputValue(newValue);
		} else {
			setInputValue(
				prev => prev + (prev ? ' ' : '') + `@${place.shortName}`
			);
		}

		setShowPlacesDropdown(false);
		setMentionQuery('');

		setTimeout(() => {
			inputRef.current?.focus();
		}, 100);
	};

	const filteredPlaces = places.filter(
		place =>
			place.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
			place.shortName.toLowerCase().includes(mentionQuery.toLowerCase())
	);

	return (
		<div
			className={cn(
				'flex flex-col items-center w-full max-w-2xl mx-auto mt-8',
				props.className
			)}
		>
			<div className="relative w-full rounded-2xl bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
				<div className="flex-1 mb-6 relative">
					<InputWithHighlights
						value={inputValue}
						onChange={handleInputChange}
						inputRef={inputRef!}
						currentAction={currentAction}
					/>

					<PlacesDropdown
						filteredPlaces={filteredPlaces}
						onPlaceSelect={handlePlaceSelect}
						show={showPlacesDropdown}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<FileUploadDialog onContentAdd={handleContentAdd} />
						<ToolsDropdown
							onToolAction={handleToolAction}
							currentAction={currentAction}
						/>
						<PlacesPopover onPlaceSelect={handlePlaceSelect} />
					</div>

					<div className="flex items-center gap-3">
						<button
							type="button"
							className="rounded-full bg-blue-50 text-blue-600 h-10 w-10 border border-blue-200 flex items-center justify-center hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
						>
							<Mic className="h-4 w-4" />
						</button>

						<button
							type="button"
							className="rounded-lg bg-gray-800 text-white h-10 w-10 flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 shadow-sm"
						>
							<ArrowUp className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			<ActionButtons />
		</div>
	);
};

export default AISearchInput;

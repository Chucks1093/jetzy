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
	Loader2,
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
import { useNavigate } from 'react-router';
import FormInput from '../shared/FormInput';

// Types
interface Place {
	id: string;
	name: string;
	address: string;
	image: string;
	shortName: string;
}

// Data - New York Places
const places: Place[] = [
	{
		id: '1',
		name: 'The Plaza Hotel',
		address: '768 5th Ave, New York, NY 10019, United States',
		image: '/images/image-1.jpg',
		shortName: 'The Plaza',
	},
	{
		id: '2',
		name: 'The St. Regis New York',
		address: '2 E 55th St, New York, NY 10022, United States',
		image: '/images/image-3.jpg',
		shortName: 'St. Regis',
	},
	{
		id: '3',
		name: 'The Ritz-Carlton New York',
		address: '50 Central Park S, New York, NY 10019, United States',
		image: '/images/image-5.jpg',
		shortName: 'Ritz-Carlton',
	},
	{
		id: '4',
		name: 'The Standard High Line',
		address: '848 Washington St, New York, NY 10014, United States',
		image: '/images/image-6.jpg',
		shortName: 'Standard High Line',
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
				return '/icons/hills.svg';
			case 'book':
				return '/icons/city.svg';
			default:
				return '/icons/plan-trip.gif';
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
			className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 overflow-hidden"
			title={getTooltip()}
		>
			<img
				src={getImage()}
				alt={getTooltip()}
				className="size-7 rounded-full object-cover"
			/>
		</div>
	);
};

// Enhanced Recording Indicator
const RecordingIndicator: React.FC<{ duration: number }> = ({ duration }) => {
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
			<div className="relative">
				<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
				<div className="absolute inset-0 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75"></div>
			</div>
			<span className="text-red-700 text-xs font-medium">
				Recording {formatTime(duration)}
			</span>
		</div>
	);
};

// Processing Indicator
const ProcessingIndicator: React.FC = () => (
	<div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
		<Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
		<span className="text-blue-700 text-xs font-medium">Processing...</span>
	</div>
);

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
					className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
				>
					<Plus className="h-4 w-4" />
				</button>
			</DialogTrigger>
			<DialogContent>
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
				return 'Plan trip';
			case 'book':
				return 'Book hotel';
			default:
				return 'Plan trip';
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-3 h-9 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
				>
					<Settings2 className="h-4 w-4 text-gray-500" />
					<span className="text-gray-700 text-sm font-medium hidden sm:block">
						{getActionLabel(currentAction)}
					</span>
					<ChevronDown className="h-3 w-3 text-gray-500" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-40">
				<DropdownMenuItem
					onClick={() => onToolAction('plan')}
					className="cursor-pointer"
				>
					<MapPin className="h-4 w-4 mr-2" />
					Plan trip
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onToolAction('book')}
					className="cursor-pointer"
				>
					<Hotel className="h-4 w-4 mr-2" />
					Book hotel
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
			className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
		/>
		<div className="flex-1 min-w-0">
			<h4 className="font-medium text-gray-900 truncate text-sm">
				{place.name}
			</h4>
			<p className="text-xs text-gray-500 truncate">{place.address}</p>
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
				className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-3 h-9 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
			>
				<Search className="h-4 w-4 text-gray-500" />
				<span className="text-gray-700 text-sm font-medium hidden sm:block">
					Places
				</span>
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-80 p-0" align="start">
			<div className="max-h-64 overflow-y-auto">
				<div className="p-3 border-b border-gray-100">
					<p className="text-xs text-gray-500">
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

const QuickActions: React.FC = () => (
	<div className="flex justify-center gap-3 mt-6">
		<button
			type="button"
			className="flex items-center gap-2 text-gray-600 rounded-lg border border-gray-200 text-sm px-4 py-2.5 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
		>
			<Compass className="h-4 w-4" />
			<span className="hidden sm:inline">Explore</span>
		</button>
		<button
			type="button"
			className="flex items-center gap-2 text-gray-600 rounded-lg border border-gray-200 text-sm px-4 py-2.5 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
		>
			<Utensils className="h-4 w-4" />
			<span className="hidden sm:inline">Dine</span>
		</button>
		<button
			type="button"
			className="flex items-center gap-2 text-gray-600 rounded-lg border border-gray-200 text-sm px-4 py-2.5 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
		>
			<Hotel className="h-4 w-4" />
			<span className="hidden sm:inline">Stay</span>
		</button>
	</div>
);

type AISearchInputProps = {
	className?: string;
};

// Main Component
const AISearchInput: React.FC<AISearchInputProps> = props => {
	const [inputValue, setInputValue] = useState<string>('');
	const [currentAction, setCurrentAction] = useState<string>('plan');
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [recordingDuration, setRecordingDuration] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const recordingTimer = useRef<NodeJS.Timeout | null>(null);

	const handleToolAction = (action: string): void => {
		setCurrentAction(action);
	};

	const handleContentAdd = (content: string): void => {
		setInputValue(prev => prev + content);
	};

	const startRecordingTimer = () => {
		setRecordingDuration(0);
		recordingTimer.current = setInterval(() => {
			setRecordingDuration(prev => prev + 1);
		}, 1000);
	};

	const stopRecordingTimer = () => {
		if (recordingTimer.current) {
			clearInterval(recordingTimer.current);
			recordingTimer.current = null;
		}
		setRecordingDuration(0);
	};

	const handleStartRecording = (): void => {
		setIsRecording(true);
		startRecordingTimer();
		console.log('Recording started');
	};

	const handleStopRecording = async (): Promise<void> => {
		setIsRecording(false);
		stopRecordingTimer();
		setIsProcessing(true);

		try {
			// Simulate API call for voice processing
			console.log('Processing voice recording...');
			await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

			// Generate a random chat ID
			const chatId = Math.random().toString(36).substring(2, 15);

			console.log('Voice processed, navigating to chat...');
			navigate(`/chat/${chatId}`);
		} catch (error) {
			console.error('Error processing recording:', error);
		} finally {
			setIsProcessing(false);
		}
	};

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleSubmit = () => {
		if (inputValue.trim()) {
			const chatId = Math.random().toString(36).substring(2, 15);
			navigate(`/chat/${chatId}`);
		}
	};

	const handlePlaceSelect = (place: Place): void => {
		setInputValue(prev => prev + (prev ? ' ' : '') + `@${place.shortName}`);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 100);
	};

	// Disable controls during recording or processing
	const isDisabled = isRecording || isProcessing;

	return (
		<div className="space-y-6">
			<div className={cn('max-w-3xl mx-auto', props.className)}>
				<div
					className={cn(
						'bg-white p-3 rounded-2xl border shadow-sm overflow-hidden transition-all duration-200',
						isRecording &&
							'border-red-300 bg-red-50/30 shadow-lg shadow-red-100',
						isProcessing && 'border-blue-300 bg-blue-50/30',
						!isRecording &&
							!isProcessing &&
							'focus-within:ring-2 focus-within:ring-gray-200 focus-within:ring-offset-2 border-gray-200'
					)}
				>
					{/* Recording/Processing Banner */}
					{(isRecording || isProcessing) && (
						<div className="mb-3 flex justify-center">
							{isRecording && (
								<RecordingIndicator duration={recordingDuration} />
							)}
							{isProcessing && <ProcessingIndicator />}
						</div>
					)}

					<FormInput
						prefix={
							<div className="text-gray-400 ">
								<ActionIcon action={currentAction} />
							</div>
						}
						value={inputValue}
						placeholder={
							isRecording
								? 'Listening... speak your travel plans'
								: isProcessing
								? 'Processing your request...'
								: 'Plan your perfect travel experience...'
						}
						onChange={handleInputChange}
						inputClassName="shadow-none border-none focus:ring-0"
						wrapperClassName="border-none focus-within:ring-0"
						label=""
						disabled={isDisabled}
					/>

					<div className="flex items-center justify-between pt-2">
						{/* Left side controls */}
						<div className="flex items-center gap-2">
							<FileUploadDialog onContentAdd={handleContentAdd} />
							<ToolsDropdown
								onToolAction={handleToolAction}
								currentAction={currentAction}
							/>
							<PlacesPopover onPlaceSelect={handlePlaceSelect} />
						</div>

						{/* Right side controls */}
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={
									isRecording
										? handleStopRecording
										: handleStartRecording
								}
								disabled={isProcessing}
								className={cn(
									'h-9 w-9 rounded-lg border flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-95',
									isRecording
										? 'bg-red-100 border-red-300 text-red-600 hover:bg-red-200 focus:ring-red-500 animate-pulse'
										: 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 focus:ring-blue-500',
									isProcessing && 'opacity-50 cursor-not-allowed'
								)}
							>
								{isRecording ? (
									<div className="w-3 h-3 bg-red-600 rounded-sm"></div>
								) : (
									<Mic className="h-4 w-4" />
								)}
							</button>

							<button
								type="button"
								onClick={handleSubmit}
								disabled={
									!inputValue.trim() || isRecording || isProcessing
								}
								className="h-9 w-9 rounded-lg bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 active:scale-95 disabled:cursor-not-allowed"
							>
								{isProcessing ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<ArrowUp className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Status Message */}
				{isRecording && (
					<p className="text-center text-sm text-red-600  mt-3">
						Listening to your travel plans... Click the stop button when
						finished
					</p>
				)}
				{isProcessing && (
					<p className="text-center text-sm text-blue-600 mt-3">
						Processing your request and creating your personalized travel
						chat...
					</p>
				)}
			</div>

			<QuickActions />
		</div>
	);
};

export default AISearchInput;

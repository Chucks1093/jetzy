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
		title: 'Resume Writing Tips',
		description:
			'An extensive conversation covering comprehensive resume writing strategies that began with analyzing current market trends in recruitment and hiring practices. We explored how applicant tracking systems (ATS) filter resumes, discussed the importance of keyword optimization without compromising readability, and delved into various resume formats including chronological, functional, and hybrid approaches. The discussion covered industry-specific requirements, from creative fields requiring portfolio integration to technical roles emphasizing skill demonstrations. We examined how to quantify achievements using metrics and percentages, explored the psychology behind recruiter scanning patterns, and addressed common mistakes like overusing buzzwords or including irrelevant information. Additionally, we covered modern resume design principles, the debate around resume length, international resume standards, and how to tailor applications for different company cultures. The conversation also touched on cover letter integration, LinkedIn profile alignment, and strategies for career gap explanations.',
		updatedAt: '2025-09-19T14:30:00Z',
	},
	{
		id: 'chat_002',
		title: 'JavaScript Best Practices',
		description:
			'A comprehensive deep-dive into modern JavaScript development practices that started with ES6+ features and evolved into advanced architectural patterns. We explored destructuring assignments, arrow functions, template literals, and async/await patterns while discussing their performance implications and browser compatibility considerations. The conversation covered module systems including CommonJS, ES Modules, and their bundling strategies with webpack and Vite. We examined memory management techniques, garbage collection optimization, and how to identify and resolve memory leaks in complex applications. Advanced topics included functional programming concepts like immutability, pure functions, and higher-order functions, along with their practical applications in state management. We discussed TypeScript integration benefits, testing strategies with Jest and Cypress, code splitting techniques for performance optimization, and security best practices including XSS prevention and input sanitization. The discussion also covered design patterns like Observer, Factory, and Module patterns, along with their modern implementations using classes and prototypal inheritance.',
		updatedAt: '2025-09-18T09:15:00Z',
	},
	{
		id: 'chat_003',
		title: 'Career Transition Planning',
		description:
			'An in-depth strategic planning session for career transformation that began with comprehensive self-assessment techniques and market analysis. We explored various career transition models, from gradual industry shifts to complete career pivots, examining the psychological and financial implications of each approach. The discussion covered skill gap analysis using industry reports and job market data, identifying transferable skills across different sectors, and creating strategic learning paths for acquiring new competencies. We examined networking strategies specific to career changers, including informational interviewing techniques, industry event participation, and online community engagement. The conversation delved into personal branding for career transitions, addressing how to position previous experience as relevant to new fields, and crafting compelling narratives that connect past achievements to future goals. We also discussed financial planning during transition periods, negotiating career change timelines with family considerations, and managing the emotional challenges of leaving established career paths. Additional topics included portfolio development for new industries, certification requirements, mentorship acquisition, and strategies for gaining relevant experience through volunteering, freelancing, or part-time opportunities.',
		updatedAt: '2025-09-17T16:45:00Z',
	},
	{
		id: 'chat_004',
		title: 'React Component Design',
		description:
			'An extensive exploration of React component architecture that covered everything from basic component patterns to advanced optimization techniques. We started with fundamental concepts like functional versus class components, then moved into hooks ecosystem including useState, useEffect, useContext, and custom hook creation. The discussion examined component composition strategies, prop drilling solutions, and state management patterns using both built-in React features and external libraries like Redux and Zustand. We explored performance optimization techniques including React.memo, useMemo, useCallback, and code splitting with React.lazy. The conversation covered testing methodologies using React Testing Library and Jest, focusing on testing component behavior rather than implementation details. We delved into accessibility considerations, proper ARIA attribute usage, and keyboard navigation implementation. Advanced topics included server-side rendering implications, hydration strategies, and concurrent features like Suspense and Error Boundaries. The discussion also covered design system integration, styled-components versus CSS modules, and component documentation strategies using Storybook. We examined TypeScript integration for better type safety, prop validation techniques, and patterns for handling complex state logic with useReducer.',
		updatedAt: '2025-09-16T11:20:00Z',
	},
	{
		id: 'chat_005',
		title: 'Interview Preparation',
		description:
			'A comprehensive interview preparation strategy covering multiple interview formats and industries. We began with fundamental preparation techniques including company research methodologies, industry trend analysis, and competitive landscape understanding. The discussion covered various interview types from phone screenings to technical assessments, behavioral interviews, and panel presentations. We explored the STAR method for behavioral questions, creating compelling story banks that demonstrate key competencies, and techniques for handling difficult questions about career gaps or job changes. Technical interview preparation included algorithm practice strategies, system design fundamentals, and code review simulations. We discussed salary negotiation tactics, benefits evaluation criteria, and how to research market rates effectively. The conversation covered post-interview follow-up strategies, thank you note crafting, and how to handle multiple offer scenarios. We also examined industry-specific interview practices, from creative portfolio presentations to consulting case studies, and how to adapt communication styles for different company cultures. Additional topics included managing interview anxiety, virtual interview best practices, and strategies for turning interview rejections into learning opportunities and future networking connections.',
		updatedAt: '2025-09-15T13:55:00Z',
	},
	{
		id: 'chat_006',
		title: 'Database Optimization',
		description:
			'A detailed technical discussion about database performance optimization covering both relational and NoSQL database systems. We started with fundamental indexing strategies, exploring B-tree, hash, and bitmap indexes, along with their appropriate use cases and performance implications. The conversation covered query optimization techniques including execution plan analysis, join optimization, and subquery refactoring strategies. We examined normalization versus denormalization trade-offs, partitioning strategies for large datasets, and sharding techniques for horizontal scaling. Advanced topics included materialized view implementation, caching strategies with Redis and Memcached, and database connection pooling optimization. We discussed monitoring and profiling tools for identifying performance bottlenecks, slow query analysis, and automated optimization recommendations. The discussion covered backup and recovery optimization, high availability configurations, and disaster recovery planning. We explored specific optimization techniques for different database systems including PostgreSQL, MySQL, MongoDB, and Cassandra, along with their unique performance characteristics. Additional topics included data warehouse optimization, ETL process efficiency, and real-time analytics implementation using technologies like Apache Kafka and Apache Spark for big data processing scenarios.',
		updatedAt: '2025-09-14T08:30:00Z',
	},
	{
		id: 'chat_007',
		title: 'UI/UX Design Principles',
		description:
			'An extensive exploration of user interface and user experience design fundamentals that began with cognitive psychology principles and their application to digital interfaces. We covered design thinking methodologies, user research techniques including surveys, interviews, and usability testing, and how to translate research findings into actionable design decisions. The discussion examined visual hierarchy principles, typography selection and pairing strategies, color theory application including accessibility considerations for color-blind users, and responsive design patterns across different device types. We explored interaction design patterns, micro-interactions that enhance user engagement, and animation principles that guide user attention without causing distraction. Advanced topics included design system creation and maintenance, component library development, and design token implementation for consistent cross-platform experiences. The conversation covered accessibility standards including WCAG guidelines, screen reader compatibility, and inclusive design practices for users with various abilities. We discussed user journey mapping, persona development based on real user data, and A/B testing strategies for design validation. Additional topics included design collaboration tools, handoff processes between design and development teams, and emerging trends like voice user interfaces and augmented reality design considerations.',
		updatedAt: '2025-09-13T15:10:00Z',
	},
	{
		id: 'chat_008',
		title: 'Project Management Methods',
		description:
			'A comprehensive analysis of project management methodologies covering traditional and agile approaches, starting with fundamental project management principles and lifecycle phases. We explored various frameworks including Waterfall, Scrum, Kanban, and hybrid approaches, examining their strengths, limitations, and appropriate use cases across different industries and project types. The discussion covered team formation strategies, stakeholder management techniques, and communication frameworks that ensure project alignment and transparency. We delved into risk management processes, including risk identification, assessment, mitigation strategies, and contingency planning. Advanced topics included resource allocation optimization, budget management techniques, and timeline estimation methods using historical data and probabilistic forecasting. The conversation examined leadership styles in project environments, conflict resolution strategies, and techniques for maintaining team motivation during challenging project phases. We discussed quality assurance integration, change management processes, and how to balance scope, time, and budget constraints effectively. Additional topics included remote team management strategies, cross-functional collaboration techniques, project management tool selection and implementation, and metrics for measuring project success beyond traditional time and budget parameters. We also covered scaling agile practices for large organizations and strategies for managing multiple concurrent projects.',
		updatedAt: '2025-09-12T10:25:00Z',
	},
	{
		id: 'chat_009',
		title: 'API Development Guide',
		description:
			'An in-depth technical guide to API development covering RESTful services, GraphQL, and modern API architectures. We began with REST principles and HTTP method semantics, exploring resource naming conventions, status code usage, and hypermedia controls for creating truly RESTful APIs. The discussion covered authentication and authorization patterns including JWT tokens, OAuth 2.0 flows, API key management, and rate limiting strategies to prevent abuse. We examined API design best practices including versioning strategies, backward compatibility maintenance, and deprecation policies that minimize disruption to existing consumers. Advanced topics included API documentation generation using OpenAPI specifications, automated testing strategies for API endpoints, and continuous integration pipelines specifically designed for API development. The conversation explored GraphQL schema design, resolver optimization, and the trade-offs between REST and GraphQL for different use cases. We discussed microservices architecture patterns, service mesh implementation, and inter-service communication strategies including synchronous and asynchronous patterns. Additional topics included API gateway configuration, monitoring and analytics implementation, caching strategies for improved performance, and security considerations including input validation, SQL injection prevention, and data sanitization techniques. We also covered API marketplace strategies and monetization models for public APIs.',
		updatedAt: '2025-09-11T17:40:00Z',
	},
	{
		id: 'chat_010',
		title: 'Personal Branding Strategy',
		description:
			'A strategic deep-dive into building and maintaining a professional personal brand across multiple platforms and touchpoints. We started with brand foundation development including values identification, unique value proposition articulation, and target audience analysis using persona development techniques. The discussion covered content strategy creation for different platforms including LinkedIn thought leadership, Twitter engagement patterns, and blog content that demonstrates expertise while providing value to the audience. We explored visual identity consistency across platforms, professional photography considerations, and how to maintain brand coherence while adapting content for platform-specific audiences and algorithms. Advanced topics included networking strategy development both online and offline, speaking opportunity acquisition, and how to position yourself as a thought leader in your industry. The conversation examined reputation management techniques, crisis communication strategies, and how to handle negative feedback or controversies professionally. We discussed measurement and analytics for personal brand growth, including engagement metrics, reach analysis, and conversion tracking for brand-building activities. Additional topics included collaboration strategies with other professionals, guest content opportunities, podcast appearances, and how to leverage personal branding for career advancement, business development, or entrepreneurial ventures. We also covered the psychology of personal branding, authenticity versus professional polish, and long-term brand evolution strategies.',
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
			<div className="h-screen bg-[#faf9f6] text-gray-900 max-w-5xl mx-auto pt-13 px-4 flex flex-col relative">
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
						{selectedFromFiltered === 0 && (
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
						)}
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

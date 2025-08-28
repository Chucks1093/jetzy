import React from 'react';
import {
	LogOut,
	Calendar,
	CreditCard,
	Star,
	Clock,
	MessageCircle,
	Bell,
	History,
	Hotel,
	Utensils,
	Heart,
	Map,
	Menu,
	X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLink, useNavigate } from 'react-router';
import authService from '@/services/auth.service';
import { useProfileStore } from '@/hooks/useProfileStore';
import showToast from '@/utils/toast.util';
interface NavigationItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	id: string;
	link: string;
	isNew?: boolean;
}

interface NavigationSection {
	title: string;
	items: NavigationItem[];
}

const navigationData: NavigationSection[] = [
	{
		title: '',
		items: [
			{
				icon: MessageCircle,
				label: 'AI Chat',
				id: 'ai-chat',
				link: '/',
				isNew: true,
			},
			{
				icon: Map,
				label: 'Explore',
				id: 'discover',
				link: '/dashboard/explore',
			},
		],
	},

	{
		title: 'BOOKINGS',
		items: [
			{
				icon: Hotel,
				label: 'Accommodations',
				id: 'accommodations',
				link: '/dashboard/accommodations',
			},
			{
				icon: Utensils,
				label: 'Restaurants',
				id: 'restaurants',
				link: '/dashboard/restaurants',
			},
			{
				icon: Calendar,
				label: 'Upcoming Trips',
				id: 'upcoming-trips',
				link: '/dashboard/trips/upcoming',
			},
			{
				icon: CreditCard,
				label: 'Payment History',
				id: 'payment-history',
				link: '/dashboard/payments',
			},
		],
	},
	{
		title: 'MESSAGES',
		items: [
			{
				icon: History,
				label: 'Chat History',
				id: 'chat-history',
				link: '/dashboard/favorites/history',
			},
			{
				icon: Bell,
				label: 'Notifications',
				id: 'notifications',
				link: '/dasboard/messages/notification',
			},
		],
	},
	{
		title: 'FAVORITES',
		items: [
			{
				icon: Star,
				label: 'Starred Chats',
				id: 'starred-chats',
				link: '/dashboard/favorites/starred',
			},

			{
				icon: Heart,
				label: 'Saved Places',
				id: 'saved-places',
				link: '/dashboard/favorites/saved',
			},
		],
	},
];

interface SideBarItemProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	link: string;
	isNew?: boolean;
	onNavigate?: () => void;
	isExpanded: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
	icon: Icon,
	label,
	link,
	isNew = false,
	onNavigate,
	isExpanded,
}) => {
	return (
		<NavLink
			end
			to={link}
			onClick={onNavigate}
			className={({ isActive }) =>
				`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group relative ${
					isActive ? 'bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
				} ${!isExpanded ? 'justify-center' : ''}`
			}
			title={!isExpanded ? label : undefined}
		>
			{({ isActive }) => (
				<>
					<Icon
						className={`w-4 h-4 flex-shrink-0 ${
							isActive
								? 'text-blue-500'
								: 'text-gray-600 group-hover:text-gray-800'
						}`}
					/>
					{isExpanded && (
						<>
							<span
								className={`text-sm font-medium transition-opacity duration-200 ${
									isActive
										? 'text-blue-500'
										: 'text-gray-700 group-hover:text-gray-900'
								}`}
							>
								{label}
							</span>
							{isNew && (
								<span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
									New
								</span>
							)}
						</>
					)}
					{/* Tooltip for collapsed state */}
					{!isExpanded && (
						<div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
							{label}
							{isNew && (
								<span className="ml-1 bg-green-500 px-1 py-0.5 rounded text-xs">
									New
								</span>
							)}
						</div>
					)}
				</>
			)}
		</NavLink>
	);
};

interface SectionHeaderProps {
	title: string;
	isExpanded: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isExpanded }) => {
	if (!title || !isExpanded) return null;

	return (
		<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 transition-opacity duration-200">
			{title}
		</h3>
	);
};

interface SideBarProps {
	className?: string;
	onNavigate?: () => void;
	onToggle?: () => void;
	isExpanded: boolean;
	isMobile: boolean;
}

const SideBar: React.FC<SideBarProps> = ({
	className,
	onNavigate,
	onToggle,
	isExpanded,
	isMobile,
}) => {
	const { clearProfile } = useProfileStore();
	const navigate = useNavigate();

	const handleLogout = async () => {
		showToast.loading('Logging out...');
		await authService.signOut();
		clearProfile();
		navigate('/');
		onNavigate?.();
	};

	const recentChats = {
		title: 'RECENTS',
		items: [
			{
				icon: Clock,
				label: 'Alabama Flights',
				id: 'alabama-flights',
				link: '/dashboard/chat/23452323',
			},
			{
				icon: Clock,
				label: 'Paris Hotels',
				id: 'paris-hotels',
				link: '/dashboard/chat/23456789',
			},
			{
				icon: Clock,
				label: 'Beach Resorts Bali',
				id: 'bali-resorts',
				link: '/dashboard/chat/23451234',
			},
			{
				icon: Clock,
				label: 'New York Restaurants',
				id: 'nyc-food',
				link: '/dashboard/chat/23459876',
			},
		],
	};

	return (
		<aside
			className={cn(
				'border-gray-200 h-screen bg-white flex flex-col z-10 shadow-lg lg:shadow-none transition-all duration-300 ease-in-out ',
				isExpanded ? 'w-64' : 'w-18',
				className
			)}
		>
			{/* Header with Toggle Button */}
			<div
				className={`h-16 flex items-center border-b border-gray-200 transition-all duration-200 ${
					isExpanded ? 'px-4 gap-2' : 'px-2 justify-center'
				}`}
			>
				{/* Toggle Button */}
				<button
					onClick={onToggle}
					className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
				>
					{isMobile ? (
						<X className="h-5 w-5 text-gray-600" />
					) : (
						<Menu className="h-5 w-5 text-gray-600" />
					)}
				</button>

				{/* Brand - only show when expanded */}
				{isExpanded && (
					<>
						<div className="bg-slate-800 flex items-center justify-center p-2 rounded-full">
							<img
								src="/icons/logo.svg"
								alt="Nora AI Logo"
								className="h-4 w-4"
								onError={e => {
									e.currentTarget.style.display = 'none';
									e.currentTarget.parentElement!.innerHTML =
										'<span class="text-white font-bold text-sm">J</span>';
								}}
							/>
						</div>
						<h2 className="font-semibold text-lg text-gray-900 font-montserrat">
							Jetzy
						</h2>
					</>
				)}
			</div>

			{/* Navigation Content */}
			<div className="flex-1 overflow-y-auto py-4 px-2 border-r border-gray-200 overflow-x-hidden">
				<nav className="space-y-6">
					{navigationData.map((section, sectionIndex) => (
						<div key={sectionIndex}>
							<SectionHeader
								title={section.title}
								isExpanded={isExpanded}
							/>
							<div className="space-y-1">
								{section.items.map(item => (
									<SideBarItem
										key={item.id}
										icon={item.icon}
										label={item.label}
										link={item.link}
										isNew={item.isNew}
										onNavigate={onNavigate}
										isExpanded={isExpanded}
									/>
								))}
							</div>
						</div>
					))}

					{isExpanded && (
						<div>
							<SectionHeader
								title={recentChats.title}
								isExpanded={isExpanded}
							/>
							<div className="space-y-1">
								{recentChats.items.map(item => (
									<SideBarItem
										key={item.id}
										icon={item.icon}
										label={item.label}
										link={item.link}
										onNavigate={onNavigate}
										isExpanded={isExpanded}
									/>
								))}
							</div>
						</div>
					)}
				</nav>
			</div>

			{/* User Profile */}
			<div className="p-4 border-t border-r border-gray-200">
				<button
					onClick={handleLogout}
					className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group text-gray-700 hover:bg-gray-100 w-full relative ${
						!isExpanded ? 'justify-center' : ''
					}`}
					title={!isExpanded ? 'Log Out' : undefined}
				>
					<LogOut className="w-4 h-4 text-gray-600 group-hover:text-gray-800 flex-shrink-0" />
					{isExpanded && (
						<span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-opacity duration-200">
							Log Out
						</span>
					)}
					{/* Tooltip for collapsed state */}
					{!isExpanded && (
						<div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
							Log Out
						</div>
					)}
				</button>
			</div>
		</aside>
	);
};

export default SideBar;

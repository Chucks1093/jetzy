import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

import { Bell, CheckCheck } from 'lucide-react';

type Tab = 'all' | 'comments' | 'likes' | 'follows';
interface NotificationItem {
	id: string;
	type: 'like' | 'comment' | 'follow';
	user: {
		name: string;
		avatar?: string;
		initials: string;
	};
	message: string;
	time: string;
	thumbnail?: string;
	isRead: boolean;
}

const mockNotifications: NotificationItem[] = [
	{
		id: '1',
		type: 'like',
		user: {
			name: 'Henry Doe',
			initials: 'J',
		},
		message: 'Liked your comment',
		time: '1m',
		thumbnail: '/images/author.jpeg',
		isRead: false,
	},
	{
		id: '2',
		type: 'comment',
		user: {
			name: 'Sarah Johnson',
			initials: 'S',
		},
		message: 'Commented on your post',
		time: '5m',
		thumbnail: '/images/author.jpeg',
		isRead: false,
	},
	{
		id: '3',
		type: 'comment',
		user: {
			name: 'Harry Johnson',
			initials: 'S',
		},
		message: 'Commented on your post',
		time: '5m',
		thumbnail: '/images/author.jpeg',
		isRead: true,
	},
	{
		id: '4',
		type: 'comment',
		user: {
			name: 'William Smith',
			initials: 'S',
		},
		message: 'Commented on your post',
		time: '2m',
		thumbnail: '/images/author.jpeg',
		isRead: false,
	},
];

export function Notification() {
	const [notifications, setNotifications] = useState(mockNotifications);
	const [activeTab, setActiveTab] = useState<Tab>('all');

	const tabs: Tab[] = ['all', 'comments', 'likes', 'follows'];

	const unreadCount = notifications.filter(n => !n.isRead).length;
	const likesCount = notifications.filter(n => n.type === 'like').length;

	const markAllAsRead = () => {
		setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
	};

	const clearAll = () => {
		setNotifications([]);
	};

	const filteredNotifications = notifications.filter(notification => {
		if (activeTab === 'all') return true;
		if (activeTab === 'comments') return notification.type === 'comment';
		if (activeTab === 'likes') return notification.type === 'like';
		if (activeTab === 'follows') return notification.type === 'follow';
		return true;
	});

	return (
		<main className="px-5 bg-white h-screen">
			<div className="w-full p-0  flex flex-col">
				<div className="flex flex-col  justify-between h-full ">
					<div className="p-4 border-b">
						<div className="flex items-center justify-between">
							<div className="flex space-x-2 justify-center items-center">
								<h1 className="text-2xl font-bold text-gray-900">
									{' '}
									Notifications
								</h1>
								{/* {unreadCount > 0 && (
									<Badge
										variant={'secondary'}
										className="text-gray-900 bg-blue-50  h-fit"
									>
										{unreadCount} <Bell />
									</Badge>
								)} */}
								<Bell className=" text-blue-600 w-5" width={10} />
							</div>

							<Button
								variant="ghost"
								size="sm"
								className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
								onClick={markAllAsRead}
							>
								<CheckCheck /> Mark all as read
							</Button>
						</div>
					</div>

					<div className="flex border-b bg-white">
						{tabs.map(tab => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`flex-1 px-4 py-3 text-[14px] text-gray-900  font-semibold border-b-2 transition-colors ${
									activeTab === tab
										? 'border-blue-500 text-blue-600'
										: 'border-transparent  hover:text-foreground'
								}`}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
								{tab === 'all' && unreadCount > 0 && (
									<span className="ml-1">{unreadCount}</span>
								)}
								{tab === 'likes' && likesCount > 0 && (
									<span className="ml-1">{likesCount}</span>
								)}
							</button>
						))}
					</div>

					<div className="flex-1 overflow-y-auto">
						{filteredNotifications.length === 0 ? (
							<div className="flex items-center justify-center h-32 text-muted-foreground">
								No notifications
							</div>
						) : (
							<div className="space-y-0">
								{filteredNotifications.map(notification => (
									<div
										key={notification.id}
										className={`flex items-center border-b-1 gap-3 p-4 hover:bg-muted/50 transition-colors ${
											!notification.isRead ? 'bg-blue-50/50' : ''
										}`}
									>
										<Avatar className="w-10 h-10">
											<AvatarImage
												src={
													notification.thumbnail ||
													'//images/author.jpeg'
												}
											/>
											<AvatarFallback className="bg-purple-600 text-white text-sm">
												{notification.user.initials}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<p className="text-sm">
												<span className="font-medium text-black">
													{notification.user.name}
												</span>{' '}
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{notification.message}
											</p>
										</div>

										<p className=" text-sm text-muted-foreground">
											{notification.time}
										</p>
									</div>
								))}
							</div>
						)}
					</div>

					{notifications.length > 0 && (
						<div className="p-4 border-t">
							<Button
								variant="ghost"
								size="sm"
								className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
								onClick={clearAll}
							>
								Clear All
							</Button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

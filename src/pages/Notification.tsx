'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

type Tab = 'all' | 'comments' | 'likes' | 'follows';
interface NotificationItem {
	id: string;
	type: 'like' | 'comment' | 'follow';
	user: {
		name: string;
		avatar?: string;
		initials: string;
	};
	action: string;
	time: string;
	thumbnail?: string;
	isRead: boolean;
}

interface NotificationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const mockNotifications: NotificationItem[] = [
	{
		id: '1',
		type: 'like',
		user: {
			name: 'John Doe',
			initials: 'E',
		},
		action: 'liked your comment',
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
		action: 'commented on your post',
		time: '5m',
		thumbnail: '/images/author.jpeg',
		isRead: true,
	},
];

export function Notification({ open, onOpenChange }: NotificationProps) {
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
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md w-full p-0 h-[90vh] flex flex-col">
				<div className="flex flex-col  justify-between h-full max-h-[70vh]">
					<DialogHeader className="p-4 border-b">
						<div className="flex items-center justify-between">
							<DialogTitle>Notifications</DialogTitle>
							<Button
								variant="ghost"
								size="sm"
								className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
								onClick={markAllAsRead}
							>
								Mark all as read
							</Button>
						</div>
					</DialogHeader>

					<div className="flex border-b">
						{tabs.map(tab => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
									activeTab === tab
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-muted-foreground hover:text-foreground'
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
										className={`flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
											!notification.isRead ? 'bg-blue-50/50' : ''
										}`}
									>
										<Avatar className="w-10 h-10">
											<AvatarImage
												src={
													notification.user.avatar ||
													'/placeholder.svg'
												}
											/>
											<AvatarFallback className="bg-purple-600 text-white text-sm">
												{notification.user.initials}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<p className="text-sm">
												<span className="font-medium">
													{notification.user.name}
												</span>{' '}
												<span className="text-muted-foreground">
													{notification.action}
												</span>
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{notification.time}
											</p>
										</div>
										{notification.thumbnail && (
											<div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
												<img
													src={notification.thumbnail}
													alt=""
													className="w-full h-full object-cover"
												/>
											</div>
										)}
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
			</DialogContent>
		</Dialog>
	);
}

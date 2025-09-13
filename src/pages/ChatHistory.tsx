'use client';

import { Input } from '@/components/ui/input';
import { CheckCheck, Search } from 'lucide-react';
import { useState } from 'react';

interface ChatItem {
	id: string;
	title: string;
	lastMessage: string;
	daysAgo: number;
}

export default function TravelChatHistory() {
	const [selectedChats, setSelectedChats] = useState<string[]>([]);

	const chats: ChatItem[] = [
		{
			id: '1',
			title: 'Paris Summer Vacation',
			lastMessage: 'Confirmed booking',
			daysAgo: 2,
		},
		{
			id: '2',
			title: 'Safari Adventure in Kenya',
			lastMessage: 'Flight info sent',
			daysAgo: 5,
		},
		{
			id: '3',
			title: 'Dubai Desert Experience',
			lastMessage: 'Tour guide assigned',
			daysAgo: 7,
		},
		{
			id: '4',
			title: 'Tokyo Cherry Blossom Tour',
			lastMessage: 'Hotel reserved',
			daysAgo: 8,
		},
		{
			id: '5',
			title: 'Santorini Sunset Tour',
			lastMessage: 'Payment completed',
			daysAgo: 10,
		},
		{
			id: '6',
			title: 'New York City Tour',
			lastMessage: 'Guide booked',
			daysAgo: 12,
		},
		{
			id: '7',
			title: 'Rome Historical Trip',
			lastMessage: 'Ticket reserved',
			daysAgo: 14,
		},
		{
			id: '8',
			title: 'Bali Beach Experience',
			lastMessage: 'Hotel booked',
			daysAgo: 16,
		},
	];

	const toggleChat = (id: string) => {
		setSelectedChats(prev =>
			prev.includes(id)
				? prev.filter(chatId => chatId !== id)
				: [...prev, id]
		);
	};

	const selectAll = () => {
		if (selectedChats.length === chats.length) {
			setSelectedChats([]);
		} else {
			setSelectedChats(chats.map(chat => chat.id));
		}
	};

	const deleteSelected = () => {
		setSelectedChats([]);
	};

	return (
		<div className="min-h-screen bg-[#faf9f6] text-gray-900 p-6">
			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-semibold text-gray-900">
						Your chat history
					</h1>
				</div>

				<div className="relative flex-1 mb-3">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-5" />
					<Input
						placeholder="Search your chats..."
						className="pl-10 bg-background outline-none "
					/>
				</div>

				{selectedChats.length > 0 ? (
					<div className="flex items-center justify-between mb-4 text-sm">
						<div className="text-blue-600 font-medium flex flex-row space-x-2 items-center justify-center">
							<CheckCheck />{' '}
							<span>{selectedChats.length} selected chats</span>
						</div>
						<div className="space-x-2">
							<button
								onClick={selectAll}
								className="text-blue-600 hover:underline"
							>
								{/* Select all */}
							</button>
							<button
								onClick={() => setSelectedChats([])}
								className="px-7 py-2 border-3 border-blue-200  text-black rounded-lg"
							>
								Cancel
							</button>
							<button
								onClick={deleteSelected}
								className="px-7 py-2 border-3 border-red-600 text-black rounded-lg"
							>
								Delete
							</button>
						</div>
					</div>
				) : (
					<p className="mb-2">
						You have {chats.length} previous chats with Jetzy
					</p>
				)}

				<div className="h-[400px] overflow-y-auto space-y-4 pr-2">
					{chats.map(chat => (
						<div
							key={chat.id}
							className={`flex items-start border rounded-lg px-4 py-3 cursor-pointer shadow-sm hover:bg-white ${
								selectedChats.includes(chat.id)
									? 'border-blue-500 bg-blue-50'
									: ''
							}`}
						>
							<input
								type="checkbox"
								checked={selectedChats.includes(chat.id)}
								onChange={() => toggleChat(chat.id)}
								className="mt-1 mr-3 "
							/>
							<div>
								<h2 className="font-normal">{chat.title}</h2>
								<p className="text-sm text-gray-500">
									{chat.lastMessage} · {chat.daysAgo} days ago
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

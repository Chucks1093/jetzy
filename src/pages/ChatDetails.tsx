import React, { useState } from 'react';
import {
	ThumbsUp,
	ThumbsDown,
	Share,
	RotateCcw,
	Send,
	ChevronRight,
} from 'lucide-react';

// Types
interface Message {
	id: string;
	type: 'user' | 'ai';
	content: string;
	timestamp: Date;
	image?: string;
	badge?: string;
	sources?: string[];
	reactions?: {
		thumbsUp: number;
		thumbsDown: number;
	};
}

interface SuggestedQuestion {
	id: string;
	text: string;
}

// Sample conversation data
const initialMessages: Message[] = [
	{
		id: '1',
		type: 'user',
		content: 'Tell me more about Mega Chicken',
		timestamp: new Date(),
	},
	{
		id: '2',
		type: 'ai',
		content: `Absolutely! Mega Chicken is a popular dining spot in Ikeja, Lagos State, known for its wide variety of dishes and family-friendly atmosphere. With a strong rating of 4.4 from over 5,400 reviews, it's a favorite among locals and visitors alike for both dine-in and takeaway options. The restaurant offers moderate pricing, making it accessible for most budgets.`,
		timestamp: new Date(),
		badge: '1. Mega Chicken',
		image: '/api/placeholder/400/300',
		reactions: { thumbsUp: 30, thumbsDown: 0 },
	},
	{
		id: '3',
		type: 'ai',
		content: `You can visit Mega Chicken any day of the week—it's open from 7 AM to 10 PM Monday through Saturday, and from 8 AM to 10 PM on Sundays. Whether you're craving Nigerian classics or international cuisine, you'll find plenty of choices here. It's also a great spot for groups or families thanks to its spacious setting. Why visit? It's perfect if you're looking for a reliable place with generous portions, quick service, and a lively local vibe. Tip: Try to visit during off-peak hours if you prefer a quieter experience! Would you like recommendations for what to try at Mega Chicken or are you interested in exploring other restaurants nearby?`,
		timestamp: new Date(),
		badge: '1. Mega Chicken',
	},
	{
		id: '4',
		type: 'user',
		content: 'how much is it in naira',
		timestamp: new Date(),
	},
	{
		id: '5',
		type: 'ai',
		content: `Great question! At Mega Chicken, prices are considered quite affordable for the quality and variety offered. Here's a quick overview of what you can expect to spend:

Most main meals, such as rice dishes or chicken combos, typically range from ₦1,500 to ₦3,500 per person🍽️📊. For example, spicy chicken wings are listed at ₦3,200📊. Some items like burgers can be found for as low as ₦1,200📊. If you're dining as a group or family, a budget of around ₦3,500 per person is a good estimate for a satisfying meal📊. 

Why visit? The value for money is one of the main reasons locals love Mega Chicken—you get generous portions without breaking the bank! Tip: Prices may vary slightly depending on your choice of dish and drinks. Would you like recommendations on what to try at Mega Chicken or are you interested in exploring other restaurants in Ikeja?`,
		timestamp: new Date(),
		badge: '1. Mega Chicken',
		image: '/api/placeholder/400/300',
		sources: ['briannwana', 'chowdeck.com', 'tripadvisor.com.nz'],
		reactions: { thumbsUp: 0, thumbsDown: 0 },
	},
];

const suggestedQuestions: SuggestedQuestion[] = [
	{ id: '1', text: 'What dishes do you recommend at Mega Chicken?' },
	{ id: '2', text: 'Are there any other affordable restaurants in Ikeja?' },
	{ id: '3', text: 'Can I see the full menu for Mega Chicken?' },
];

const categories = [
	{ id: 'activities', name: 'Activities', active: false },
	{ id: 'eats', name: 'Eats', active: true },
	{ id: 'hotels', name: 'Hotels', active: false },
];

// Components
interface MessageBubbleProps {
	message: Message;
	onReaction: (messageId: string, type: 'up' | 'down') => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
	message,
	onReaction,
}) => {
	if (message.type === 'user') {
		return (
			<div className="flex justify-end mb-4">
				<div className="bg-yellow-200 text-gray-800 px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
					{message.content}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col mb-6">
			{/* AI Avatar and Name */}
			<div className="flex items-center gap-2 mb-2">
				<div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
					<span className="text-black text-sm">😊</span>
				</div>
				<span className="font-medium text-gray-900">Itina</span>
			</div>

			{/* Badge */}
			{message.badge && (
				<div className="mb-3">
					<span className="inline-flex items-center gap-1 bg-yellow-300 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
						{message.badge}
						<ChevronRight className="h-3 w-3" />
					</span>
				</div>
			)}

			{/* Content */}
			<div className="text-gray-800 mb-3 whitespace-pre-line">
				{message.content}
			</div>

			{/* Image */}
			{message.image && (
				<div className="mb-4">
					<img
						src={message.image}
						alt="Restaurant interior"
						className="rounded-lg w-full max-w-md h-64 object-cover"
					/>
				</div>
			)}

			{/* Reactions and Sources */}
			<div className="flex items-center gap-4 text-sm text-gray-500">
				{message.reactions && (
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1">
							<span className="text-xs">👍👎👤</span>
							<span>{message.reactions.thumbsUp} posts</span>
						</div>
					</div>
				)}

				<div className="flex items-center gap-2">
					<button
						onClick={() => onReaction(message.id, 'up')}
						className="p-1 hover:bg-gray-100 rounded"
					>
						<ThumbsUp className="h-4 w-4" />
					</button>
					<button
						onClick={() => onReaction(message.id, 'down')}
						className="p-1 hover:bg-gray-100 rounded"
					>
						<ThumbsDown className="h-4 w-4" />
					</button>
					<button className="p-1 hover:bg-gray-100 rounded">
						<RotateCcw className="h-4 w-4" />
						<span className="ml-1 text-xs">Regenerate</span>
					</button>
				</div>
			</div>

			{/* Sources */}
			{message.sources && (
				<div className="mt-2 text-xs text-gray-400">
					Sources: {message.sources.join(', ')}
				</div>
			)}
		</div>
	);
};

const AIChatInterface: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [inputValue, setInputValue] = useState<string>('');
	const [expandedQuestions, setExpandedQuestions] = useState<boolean>(true);

	const handleSendMessage = (): void => {
		if (!inputValue.trim()) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			type: 'user',
			content: inputValue,
			timestamp: new Date(),
		};

		setMessages(prev => [...prev, newMessage]);
		setInputValue('');

		// Simulate AI response (in real app, this would call your AI service)
		setTimeout(() => {
			const aiResponse: Message = {
				id: (Date.now() + 1).toString(),
				type: 'ai',
				content: 'This would be the AI response to your question...',
				timestamp: new Date(),
			};
			setMessages(prev => [...prev, aiResponse]);
		}, 1000);
	};

	const handleReaction = (messageId: string, type: 'up' | 'down'): void => {
		setMessages(prev =>
			prev.map(msg => {
				if (msg.id === messageId && msg.reactions) {
					return {
						...msg,
						reactions: {
							...msg.reactions,
							[type === 'up' ? 'thumbsUp' : 'thumbsDown']:
								msg.reactions[
									type === 'up' ? 'thumbsUp' : 'thumbsDown'
								] + 1,
						},
					};
				}
				return msg;
			})
		);
	};

	const handleSuggestedQuestion = (question: string): void => {
		setInputValue(question);
	};

	return (
		<div className="flex flex-col h-screen max-w-2xl mx-auto bg-white">
			{/* Chat Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map(message => (
					<MessageBubble
						key={message.id}
						message={message}
						onReaction={handleReaction}
					/>
				))}
			</div>

			{/* Suggested Questions */}
			{expandedQuestions && (
				<div className="px-4 py-2">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-medium text-gray-700">
							🧭 Ask me more questions
						</span>
						<button
							onClick={() => setExpandedQuestions(false)}
							className="text-gray-400 hover:text-gray-600"
						>
							<ChevronRight className="h-4 w-4 rotate-90" />
						</button>
					</div>
					<div className="space-y-2">
						{suggestedQuestions.map(question => (
							<button
								key={question.id}
								onClick={() => handleSuggestedQuestion(question.text)}
								className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group"
							>
								<span className="text-sm text-gray-700">
									{question.text}
								</span>
								<ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
							</button>
						))}
					</div>
				</div>
			)}

			{/* Category Buttons */}
			<div className="px-4 py-2">
				<div className="flex gap-2">
					{categories.map(category => (
						<button
							key={category.id}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								category.active
									? 'bg-yellow-300 text-gray-800'
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
							}`}
						>
							{category.name}
						</button>
					))}
				</div>
			</div>

			{/* Input Area */}
			<div className="p-4 border-t border-gray-200">
				<div className="flex gap-2">
					<input
						type="text"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
						placeholder="Ask me anything..."
						className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
					/>
					<button
						onClick={handleSendMessage}
						disabled={!inputValue.trim()}
						className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Send className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AIChatInterface;

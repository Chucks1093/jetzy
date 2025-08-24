import React, { useState } from 'react';
import { Paperclip, Mic, ArrowUp } from 'lucide-react';

type ChatInputProps = {
	onSendMessage?: (message: string) => void;
	onAttachment?: () => void;
	onVoiceRecord?: () => void;
	placeholder?: string;
	className?: string;
};

const ChatInput: React.FC<ChatInputProps> = ({
	onSendMessage,
	onAttachment,
	onVoiceRecord,
	placeholder = "What's the move?",
	className = '',
}) => {
	const [message, setMessage] = useState('');

	const handleSendMessage = () => {
		if (message.trim() && onSendMessage) {
			onSendMessage(message.trim());
			setMessage('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div
			className={`w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl px-4 py-2  shadow-sm focus-within:border-gray-300 focus-within:ring-1 focus-within:ring-gray-300 ${className}`}
		>
			<div className=" ">
				<input
					type="text"
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder={placeholder}
					className="flex-1  bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none w-full block  h-11 "
				/>
			</div>

			<div className="flex items-center justify-between mt-1">
				{/* Emoji Button */}
				<div className="flex items-center gap-2">
					<div className="bg-slate-800 flex items-center justify-center .p-2 rounded-full">
						<img
							// src="/icons/logo.svg"
							src="/gifs/plan-trip.gif"
							alt="Nora AI Logo"
							// className="h-5 w-5 rounded-full"
							className=" h-9 w-9 rounded-full object-cover"
							onError={e => {
								e.currentTarget.style.display = 'none';
								e.currentTarget.parentElement!.innerHTML =
									'<span class="text-white font-bold text-sm">J</span>';
							}}
						/>
					</div>

					{/* Attachment Button */}
					<button
						type="button"
						onClick={onAttachment}
						className="flex-shrink-0  p-2 text-gray-500 hover:text-gray-700 transition-colors border rounded-full"
					>
						<Paperclip className="w-5 h-5" />
					</button>
				</div>

				{/* Text Input */}

				{/* Voice Record Button */}
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={onVoiceRecord}
						className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 transition-colors border rounded-full"
					>
						<Mic className="w-5 h-5" />
					</button>

					{/* Send Button */}
					<button
						onClick={handleSendMessage}
						disabled={!message.trim()}
						className={`flex-shrink-0 p-2 rounded-full flex items-center justify-center transition-all ${
							message.trim()
								? 'bg-gray-900 text-white hover:bg-gray-800'
								: 'bg-gray-200 text-gray-400 cursor-not-allowed'
						}`}
					>
						<ArrowUp className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

// Example usage component
const ChatInputDemo: React.FC = () => {
	const handleSendMessage = (message: string) => {
		console.log('Sending message:', message);
	};

	const handleAttachment = () => {
		console.log('Opening attachment picker');
	};

	const handleVoiceRecord = () => {
		console.log('Starting voice recording');
	};

	return (
		<ChatInput
			onSendMessage={handleSendMessage}
			onAttachment={handleAttachment}
			onVoiceRecord={handleVoiceRecord}
			placeholder="What's the move?"
		/>
	);
};

export default ChatInputDemo;

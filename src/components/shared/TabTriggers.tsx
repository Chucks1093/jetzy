import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface TabItem {
	value: string;
	label: string;
	icon?: LucideIcon;
	count?: number;
	disabled?: boolean;
}

interface TabTriggersProps {
	tabs: TabItem[];
	className?: string;
}

const TabTriggers: React.FC<TabTriggersProps> = ({ tabs, className }) => {
	return (
		<TabsList
			className={cn(
				'flex w-fit items-center bg-transparent gap-3 p-0 h-auto',
				className
			)}
		>
			{tabs.map(tab => {
				const Icon = tab.icon;
				const hasCount = tab.count || tab.count == 0;
				return (
					<TabsTrigger
						className="group flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 rounded-3xl data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 text-gray-600 hover:bg-gray-50 data-[state=active]:shadow-none"
						key={tab.value}
						value={tab.value}
						disabled={tab.disabled}
					>
						{Icon && <Icon className="size-6" />}
						<span className="font-medium text-xs">{tab.label}</span>
						{hasCount && (
							<span className="flex items-center justify-center font-medium text-gray-500 group-data-[state=active]:text-blue-600 p-1 px-3 rounded-full bg-gray-200 group-data-[state=active]:bg-blue-200">
								{tab.count}
							</span>
						)}
					</TabsTrigger>
				);
			})}
		</TabsList>
	);
};

export default TabTriggers;

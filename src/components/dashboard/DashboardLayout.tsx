import SideBar from './Sidebar';
import { Outlet } from 'react-router';
import { useState } from 'react';
import { Menu } from 'lucide-react';

function DashboardLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Desktop sidebar state

	const toggleMobileSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const toggleDesktopSidebar = () => {
		setIsSidebarExpanded(!isSidebarExpanded);
	};

	const closeMobileSidebar = () => {
		setIsSidebarOpen(false);
	};

	return (
		<>
			{/* Mobile Layout */}
			<div className="lg:hidden min-h-screen bg-gray-50">
				{/* Mobile overlay */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 bg-black opacity-50 z-40"
						onClick={closeMobileSidebar}
					/>
				)}

				{/* Mobile Sidebar */}
				<SideBar
					className={`
						fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out
						${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
					`}
					onNavigate={closeMobileSidebar}
					onToggle={toggleMobileSidebar}
					isExpanded={true} // Always expanded on mobile when open
					isMobile={true}
				/>

				{/* Mobile Content - Full width since no header */}
				<div className="min-h-screen">
					<header className="h-[9vh] border-b bg-white flex items-center justify-between p-4">
						{' '}
						<button
							onClick={toggleMobileSidebar}
							className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
						>
							<Menu className="size-6 text-gray-600" />
						</button>
						<div className="flex items-center gap-2">
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
						</div>
					</header>
					<main className="min-h-screen bg-[#f8fafe] overflow-auto">
						<Outlet />
					</main>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:block min-h-screen">
				<div
					className={`min-h-screen transition-all duration-300 ease-in-out ${
						isSidebarExpanded
							? 'grid-cols-[256px_1fr]'
							: 'grid-cols-[72px_1fr]'
					} grid h-screen`}
				>
					{/* Desktop Sidebar */}
					<SideBar
						className="h-screen"
						onToggle={toggleDesktopSidebar}
						isExpanded={isSidebarExpanded}
						isMobile={false}
					/>

					{/* Desktop Main content area - fills remaining space */}
					<main className="bg-[#fef9f8] overflow-auto">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}

export default DashboardLayout;

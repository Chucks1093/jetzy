import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Home from './pages/Home';
import ChatDetails from './pages/ChatDetails';
import Explore from './pages/Explore';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/chat/:id',
				element: <ChatDetails />,
			},
			{
				path: '/dashboard/explore',
				element: <Explore />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

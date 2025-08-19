import './app.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Home from './pages/Home';
import ChatDetails from './pages/ChatDetails';

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

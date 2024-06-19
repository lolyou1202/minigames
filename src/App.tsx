import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Wordle } from './pages/Wordle/Wordle'
import { AppLayout } from './layouts/AppLayout/AppLayout'

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <div>home</div>,
			},
			{
				path: '/feed',
				element: <div>feed</div>,
			},
			{
				path: '/shop',
				element: <div>shop</div>,
			},
			{
				path: '/settings',
				element: <div>settings</div>,
			},
			{
				path: '/wordle',
				children: [
					{
						index: true,
						element: <Wordle />,
					},
					{
						path: ':word',
						element: <Wordle />,
					},
				],
			},
		],
	},
])

function App() {
	return (
		<RouterProvider router={router}>
			<AppLayout />
		</RouterProvider>
	)
}

export default App

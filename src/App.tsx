import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Wordle } from './pages/Wordle/Wordle'

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <div>home</div>,
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
	return <RouterProvider router={router} />
}

export default App

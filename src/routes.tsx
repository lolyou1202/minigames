import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout/AppLayout'
import { Wordle } from './pages/Wordle/Wordle'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: (
					<AppLayout variantHeader='withSearch' variantMain='empty'>
						home
					</AppLayout>
				),
			},
			{
				path: '/feed',
				element: (
					<AppLayout variantHeader='withSearch' variantMain='empty'>
						feed
					</AppLayout>
				),
			},
			{
				path: '/feed/:game',
				element: (
					<AppLayout variantHeader='withSearch' variantMain='empty'>
						feed game
					</AppLayout>
				),
			},
			{
				path: '/shop',
				element: (
					<AppLayout variantHeader='withSearch' variantMain='empty'>
						shop
					</AppLayout>
				),
			},
			{
				path: '/settings',
				element: (
					<AppLayout variantHeader='withSearch' variantMain='empty'>
						settings
					</AppLayout>
				),
			},
			{
				path: '/wordle',
				element: (
					<AppLayout
						variantHeader='withBanner'
						variantMain='withCanvas'
					>
						<Wordle />
					</AppLayout>
				),
			},
			{
				path: '/wordle/:word',
				element: (
					<AppLayout
						variantHeader='withBanner'
						variantMain='withCanvas'
					>
						<Wordle />
					</AppLayout>
				),
			},
		],
	},
])

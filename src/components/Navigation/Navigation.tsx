import './Navigation.style.scss'
import { useNavigate } from 'react-router-dom'
import { NavigationItem } from './NavigationItem'
import SVG from 'react-inlinesvg'

const navList = {
	home: {
		label: 'Home',
		url: '/home',
	},
	feed: {
		label: 'Game feed',
		url: '/feed',
	},
	shop: {
		label: 'Shop',
		url: '/shop',
	},
	settings: {
		label: 'Settings',
		url: '/settings',
	},
}

interface Props {
	activeLink: string
	onClickNavItem: (name: string) => void
}

export const Navigation = ({ activeLink, onClickNavItem }: Props) => {
	const navigate = useNavigate()

	const mappedList = Object.entries(navList)
	return (
		<nav className='nav'>
			<ul className='nav__list'>
				{mappedList.map(([name, { label, url }]) => (
					<NavigationItem
						isActive={activeLink === name}
						icon={
							<SVG
								src={`../../../icons/${name}.svg`}
								width={32}
							/>
						}
						label={label}
						onClick={() => {
							onClickNavItem(name)
							navigate(url)
						}}
					/>
				))}
			</ul>
		</nav>
	)
}

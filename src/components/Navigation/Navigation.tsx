import './Navigation.style.scss'
import { NavigationItem } from './NavigationItem'
import SVG from 'react-inlinesvg'

const navList = {
	home: {
		label: 'Home',
		url: '/',
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
	onClickNavItem: (url: string) => void
}

export const Navigation = ({ activeLink, onClickNavItem }: Props) => {
	const mappedList = Object.entries(navList)
	return (
		<nav className='nav'>
			<ul className='nav__list'>
				{mappedList.map(([name, { label, url }]) => (
					<NavigationItem
						key={name}
						isActive={activeLink === url}
						icon={
							<SVG
								src={`../../../icons/${name}.svg`}
								width={32}
							/>
						}
						label={label}
						onClick={() => onClickNavItem(url)}
					/>
				))}
			</ul>
		</nav>
	)
}

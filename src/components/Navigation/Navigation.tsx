import './Navigation.style.scss'
import { NavigationItem } from './NavigationItem'
import SVG from 'react-inlinesvg'

const navList = {
	home: {
		label: 'Главная',
		url: '/',
	},
	feed: {
		label: 'Лента игр',
		url: '/feed',
	},
	shop: {
		label: 'Магазин',
		url: '/shop',
	},
	settings: {
		label: 'Настройки',
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

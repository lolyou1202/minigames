import './Sidebar.style.scss'
import React from 'react'
import SVG from 'react-inlinesvg'
import { Navigation } from '../Navigation/Navigation'

export const Sidebar = () => {
	const [activeLink, setLink] = React.useState('home')

	const handleClickNavItem = (name: string) => {
		setLink(name)
	}

	return (
		<aside className='sidebar'>
			<div className='logo'>
				<SVG src={'../../../icons/fullLogo.svg'} width={186} />
			</div>
			<Navigation
				activeLink={activeLink}
				onClickNavItem={handleClickNavItem}
			/>
		</aside>
	)
}

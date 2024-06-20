import './Sidebar.style.scss'
import React from 'react'
import classNames from 'classnames'
import SVG from 'react-inlinesvg'
import { Navigation } from '../Navigation/Navigation'
import { useLocation, useNavigate } from 'react-router-dom'

export const Sidebar = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const [activeLink, setLink] = React.useState(location.pathname)

	const handleClickNavItem = (url: string) => {
		setLink(url)
		navigate(url)
	}

	const sidebarCN = classNames('sidebar')

	return (
		<aside className={sidebarCN}>
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

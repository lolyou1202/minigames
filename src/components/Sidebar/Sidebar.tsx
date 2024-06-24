import './Sidebar.style.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import SVG from 'react-inlinesvg'
import { Navigation } from '../Navigation/Navigation'
import { LocationState } from '../../types'
import { useState } from 'react'
import { BorderedButton } from '../BorderedButton/BorderedButton'

export const Sidebar = () => {
	const [isCollapsedSidebar, setCollapseSidebar] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()

	const currentPath = location.pathname
	const state = location.state as LocationState

	const handleClickNavItem = (url: string) => {
		navigate(url, {
			state: {
				from: state?.from
					? [currentPath, ...state.from]
					: [currentPath],
			},
		})
	}

	const toggleCollapseSidebar = () => setCollapseSidebar(prev => !prev)

	const sidebarCN = classNames('sidebar', { collapsed: isCollapsedSidebar })

	return (
		<aside className={sidebarCN}>
			<div>
				<div className='logo'>
					<SVG src={'../../../icons/fullLogo.svg'} width={186} />
				</div>
				<Navigation
					activeLink={currentPath}
					onClickNavItem={handleClickNavItem}
				/>
			</div>
			<BorderedButton
				background='primary'
				icon={
					<SVG
						src={`../../../icons/${
							isCollapsedSidebar
								? 'arrowBarRight'
								: 'arrowBarLeft'
						}.svg`}
						width={32}
					/>
				}
				text='Свернуть'
				onClick={toggleCollapseSidebar}
			/>
		</aside>
	)
}

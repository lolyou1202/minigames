import './Sidebar.style.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import SVG from 'react-inlinesvg'
import { Navigation } from '../Navigation/Navigation'
import { LocationState } from '../../types'

export const Sidebar = () => {
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

	const sidebarCN = classNames('sidebar')

	return (
		<aside className={sidebarCN}>
			<div className='logo'>
				<SVG src={'../../../icons/fullLogo.svg'} width={186} />
			</div>
			<Navigation
				activeLink={currentPath}
				onClickNavItem={handleClickNavItem}
			/>
		</aside>
	)
}

import './Header.style.scss'
import { AppLayoutProps } from '../../layouts/AppLayout/AppLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { BorderedButton } from '../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'
import { BorderedContainer } from '../BorderedContainer/BorderedContainer'
import { Search } from '../Search/Search'
import { LocationState } from '../../types'

export const Header = <
	Props extends Pick<AppLayoutProps, 'variantHeader' | 'headerLabel'>
>({
	variantHeader = 'withSearch',
	headerLabel,
}: Props) => {
	const location = useLocation()
	const navigate = useNavigate()

	const state = location.state as LocationState

	const handleClickBack = () => {
		if (!state || state.from.length === 0) return

		const locationFrom = state.from
		const [_, ...rest] = locationFrom

		navigate(locationFrom[0], { state: { from: rest } })
	}

	return (
		<header className='header'>
			<BorderedButton
				variant='withShadow'
				background='primary'
				icon={<SVG src='../../../icons/arrowLeft.svg' width={32} />}
				className='header-back'
				onClick={handleClickBack}
			/>
			{variantHeader === 'withBanner' && (
				<BorderedContainer
					variant='withShadow'
					background='light'
					text={headerLabel}
					className='header-game'
				/>
			)}
			{variantHeader === 'withSearch' && <Search />}
		</header>
	)
}

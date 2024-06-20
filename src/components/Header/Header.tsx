import './Header.style.scss'
import { AppLayoutProps } from '../../layouts/AppLayout/AppLayout'
import { BorderedButton } from '../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'
import { BorderedContainer } from '../BorderedContainer/BorderedContainer'
import { Search } from '../Search/Search'

export const Header = <Props extends Pick<AppLayoutProps, 'variantHeader'>>({
	variantHeader = 'withSearch',
}: Props) => {
	return (
		<header className='header'>
			<BorderedButton
				variant='withShadow'
				background='primary'
				icon={<SVG src='../../../icons/arrowLeft.svg' width={32} />}
				className='header-back'
				onClick={() => {}}
			/>
			{variantHeader === 'withBanner' && (
				<BorderedContainer
					variant='withShadow'
					background='light'
					text='Wordly'
					className='header-game'
				/>
			)}
			{variantHeader === 'withSearch' && <Search />}
		</header>
	)
}

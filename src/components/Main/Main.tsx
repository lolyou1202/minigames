import './Main.style.scss'
import { AppLayoutProps } from '../../layouts/AppLayout/AppLayout'
import { BorderedContainer } from '../BorderedContainer/BorderedContainer'

export const Main = <Props extends Omit<AppLayoutProps, 'variantHeader'>>({
	variantMain = 'empty',
	children,
}: Props) => {
	return (
		<main
			className='main'
			id='main'
		>
			{variantMain === 'withCanvas' && (
				<BorderedContainer
					variant='withShadow'
					background='light'
					className='canvas'
				>
					{children}
				</BorderedContainer>
			)}
			{variantMain === 'empty' && children}
			<div
				id='modalRoot'
				className='modalRoot'
			></div>
		</main>
	)
}

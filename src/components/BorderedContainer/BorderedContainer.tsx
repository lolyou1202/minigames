import './BorderedContainer.style.scss'
import classNames from 'classnames'
import { BorderedButtonProps } from '../BorderedButton/BorderedButton'

export const BorderedContainer = <P extends BorderedButtonProps>({
	variant = 'withoutShadow',
	background = 'light',
	children,
}: P) => {
	const borderedContainerCN = classNames(
		'borderedContainer',
		variant,
		background
	)
	return (
		<div className={borderedContainerCN}>
			<div className='borderedContainer-wrapper' />
			{children}
		</div>
	)
}

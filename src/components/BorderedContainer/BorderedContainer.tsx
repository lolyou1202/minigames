import './BorderedContainer.style.scss'
import classNames from 'classnames'
import { BorderedButtonProps } from '../BorderedButton/BorderedButton'

export const BorderedContainer = <Props extends BorderedButtonProps>({
	variant = 'withoutShadow',
	background = 'light',
	text,
	className,
	children,
}: Props) => {
	const borderedContainerCN = classNames(
		'borderedContainer',
		variant,
		background,
		className
	)
	return (
		<div className={borderedContainerCN}>
			<div className='borderedContainer-wrapper' />
			{text && <span>{text}</span>}
			{children}
		</div>
	)
}

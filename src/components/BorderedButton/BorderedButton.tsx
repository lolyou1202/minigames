import './BorderedButton.style.scss'
import classNames from 'classnames'
import { BorderedContainer } from '../BorderedContainer/BorderedContainer'

export type BorderedButtonBackground =
	| 'light'
	| 'primary'
	| 'secondary'
	| 'transparent'
export type BorderedContainerVariant =
	| 'withShadow'
	| 'withoutShadow'
	| 'withoutBorder'

export interface BorderedButtonProps {
	variant?: BorderedContainerVariant
	icon?: React.ReactNode
	text?: string
	background?: BorderedButtonBackground
	className?: string
	onClick?: () => void
	children?: React.ReactNode
}

export const BorderedButton = ({
	variant = 'withoutShadow',
	icon,
	text,
	background = 'light',
	className,
	onClick,
	children,
}: BorderedButtonProps) => {
	const borderedButtonCN = classNames('borderedButton', className)
	return (
		<button className={borderedButtonCN} onClick={onClick}>
			<BorderedContainer variant={variant} background={background}>
				{icon}
				{text && <span>{text}</span>}
				{children}
			</BorderedContainer>
		</button>
	)
}

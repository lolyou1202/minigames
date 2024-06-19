import './BorderedButton.style.scss'
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
	onClick?: () => void
	children?: React.ReactNode
}

export const BorderedButton = ({
	variant = 'withoutShadow',
	icon,
	text,
	background = 'light',
	onClick,
	children,
}: BorderedButtonProps) => {
	return (
		<button className='borderedButton' onClick={onClick}>
			<BorderedContainer variant={variant} background={background}>
				{icon}
				<span>{text}</span>
				{children}
			</BorderedContainer>
		</button>
	)
}

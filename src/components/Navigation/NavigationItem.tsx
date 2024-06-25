import { BorderedButton } from '../BorderedButton/BorderedButton'

interface Props {
	isActive: boolean
	label: string
	icon: React.ReactNode
	onClick: () => void
}

export const NavigationItem = ({ isActive, label, icon, onClick }: Props) => {
	return (
		<li className='nav__list-item'>
			<BorderedButton
				variant={isActive ? 'withShadow' : 'withoutBorder'}
				background={isActive ? 'primary' : 'transparent'}
				icon={icon}
				text={label}
				onClick={onClick}
			/>
		</li>
	)
}

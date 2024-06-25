import { BorderedButton } from '../../../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'

interface Props {
	background?: 'secondary' | 'primary'
	iconName?: string
	onClick?: () => void
}

export const SingleWordleFuncButton = ({
	background = 'secondary',
	iconName,
	onClick,
}: Props) => {
	return (
		<BorderedButton
			variant='withoutShadow'
			background={background}
			icon={
				iconName && (
					<SVG src={`../../../icons/${iconName}.svg`} width={32} />
				)
			}
			onClick={onClick}
		/>
	)
}

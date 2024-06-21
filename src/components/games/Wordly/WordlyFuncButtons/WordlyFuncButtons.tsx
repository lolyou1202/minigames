import './WordlyFuncButtons.style.scss'
import { BorderedButton } from '../../../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'

const buttonsList = {
	left: [
		{ name: 'plusCircle', variant: 'primary' },
		{ name: 'share', variant: 'secondary' },
		{ name: 'refresh', variant: 'secondary' },
	],
	right: [
		{ name: 'info', variant: 'secondary' },
		{ name: 'chartBar', variant: 'secondary' },
		{ name: 'settings', variant: 'secondary' },
	],
} as const

export const WordlyFuncButtons = () => {
	const handleClickFuncButton = {
		plusCircle() {},
		share() {},
		refresh() {},
		info() {},
		chartBar() {},
		settings() {},
	}
	return (
		<div className='wordle-funcButtons'>
			{Object.values(buttonsList).map((side, index) => (
				<span key={index}>
					{side.map(button => {
						const { name, variant } = button
						return (
							<BorderedButton
								key={name}
								variant='withoutShadow'
								background={variant}
								icon={
									<SVG
										src={`../../../icons/${name}.svg`}
										width={32}
									/>
								}
								onClick={handleClickFuncButton[name]}
							/>
						)
					})}
				</span>
			))}
		</div>
	)
}

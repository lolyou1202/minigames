import './WordlyFuncButtons.style.scss'
import { SingleWordleFuncButton } from './SingleWordleFuncButton'

const buttonsList = {
	left: [
		{ name: 'plusCircle', variant: 'secondary' },
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
							<SingleWordleFuncButton
								key={name}
								background={variant}
								iconName={name}
								onClick={handleClickFuncButton[name]}
							/>
						)
					})}
				</span>
			))}
		</div>
	)
}

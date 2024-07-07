import './StartMenu.style.scss'
import { BorderedButton } from '../../../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'

const buttonsList = [
	{
		name: 'generator',
		background: 'primary',
		icon: 'dice',
		label: 'Генератор Wordly',
	},
	{
		name: 'info',
		background: 'secondary',
		icon: 'info',
		label: 'Правила игры',
	},
	{
		name: 'statistic',
		background: 'secondary',
		icon: 'chartBar',
		label: 'Статистика',
	},
	{
		name: 'settings',
		background: 'secondary',
		icon: 'settings',
		label: 'Настройки',
	},
	{ name: 'exit', background: 'secondary', icon: 'exit', label: 'Выход' },
] as const

export const StartMenu = () => {
	const handleClickMenuButton = {
		generator() {},
		info() {},
		statistic() {},
		settings() {},
		exit() {},
	}
	return (
		<div className='startMenu'>
			{buttonsList.map(button => {
				const { name, background, icon, label } = button
				return (
					<BorderedButton
						key={name}
						background={background}
						icon={
							<SVG
								src={`../../../icons/${icon}.svg`}
								width={32}
							/>
						}
						text={label}
						onClick={handleClickMenuButton[name]}
					/>
				)
			})}
		</div>
	)
}

import './Keyboard.style.scss'
import { russianAlphabetKeyboard } from '../../constants/alphabet'
import { BorderedButton } from '../BorderedButton/BorderedButton'

export const Keyboard = () => {
	return (
		<div className='keyboard'>
			{russianAlphabetKeyboard.map((row, indexRow) => (
				<div key={indexRow} className='keyboard-row'>
					{row.map((key, indexCell) => (
						<BorderedButton
							key={indexCell}
							variant='withoutShadow'
							background='secondary'
							className='keyboard-key'
						>
							{key}
						</BorderedButton>
					))}
					{indexRow === 1 && (
						<BorderedButton
							variant='withoutShadow'
							background='secondary'
							className='keyboard-key'
						>
							back
						</BorderedButton>
					)}
					{indexRow === 2 && (
						<BorderedButton
							variant='withoutShadow'
							background='secondary'
							className='keyboard-key enter'
						>
							enter
						</BorderedButton>
					)}
				</div>
			))}
		</div>
	)
}

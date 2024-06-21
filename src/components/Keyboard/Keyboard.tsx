import './Keyboard.style.scss'
import { russianAlphabetKeyboard } from '../../constants/alphabet'

export const Keyboard = () => {
	return (
		<div className='keyboard'>
			{russianAlphabetKeyboard.map((row, index) => (
				<div key={index} className='keyboard-row'>
					{row.map(key => (
						<div key={key} className='keyboard-key'>
							{key}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

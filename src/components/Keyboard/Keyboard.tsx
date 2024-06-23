import './Keyboard.style.scss'
import { russianAlphabet, russianAlphabetKeyboard } from '../../constants/alphabet'
import { BorderedButton } from '../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'
import { useKeyPressEvent } from 'react-use'

export const Keyboard = () => {
	russianAlphabet.forEach(char => {
		useKeyPressEvent(
			char,
			() =>
				curentPosition.letter < wordLength &&
				gameStage === 'solve' &&
				handlePressKey(char)
		)
	})

	useKeyPressEvent(
		'Enter',
		() =>
			curentPosition.letter !== 0 &&
			gameStage === 'solve' &&
			handlePressEnter()
	)
	useKeyPressEvent(
		'Backspace',
		() =>
			curentPosition.letter !== 0 &&
			gameStage === 'solve' &&
			handlePressBackspace()
	)
	return (
		<div className='keyboard-container'>
			<article className='keyboard'>
				{russianAlphabetKeyboard.map((row, indexRow) => (
					<div key={indexRow} className='keyboard-row'>
						{row.map((key, indexCell) => (
							<BorderedButton
								key={indexCell}
								variant='withoutShadow'
								background='secondary'
								text={key}
								className='keyboard-key'
							/>
						))}
						{indexRow === 1 && (
							<BorderedButton
								variant='withoutShadow'
								background='secondary'
								icon={
									<SVG
										src='../../../icons/backspace.svg'
										width={32}
									/>
								}
								className='keyboard-key backspace'
							/>
						)}
						{indexRow === 2 && (
							<BorderedButton
								variant='withoutShadow'
								background='primary'
								icon={
									<SVG
										src='../../../icons/enter.svg'
										width={32}
									/>
								}
								text='enter'
								className='keyboard-key enter'
							/>
						)}
					</div>
				))}
			</article>
		</div>
	)
}

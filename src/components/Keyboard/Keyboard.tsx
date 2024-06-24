import './Keyboard.style.scss'
import { AlphabetLetter, AlphabetState } from '../../types'
import {
	russianAlphabet,
	russianAlphabetKeyboard,
} from '../../constants/alphabet'
import { useKeyPressEvent } from 'react-use'
import { BorderedButton } from '../BorderedButton/BorderedButton'
import SVG from 'react-inlinesvg'
import classNames from 'classnames'

interface Props {
	alphabet?: AlphabetState
	onPressKey?: (key: AlphabetLetter) => void
	onPressBackspace?: () => void
	onPressEnter?: () => void
}

export const Keyboard = ({
	alphabet,
	onPressKey,
	onPressBackspace,
	onPressEnter,
}: Props) => {
	onPressKey &&
		russianAlphabet.forEach(key => {
			useKeyPressEvent(key, () => onPressKey(key))
		})
	onPressBackspace && useKeyPressEvent('Backspace', () => onPressBackspace())
	onPressEnter && useKeyPressEvent('Enter', () => onPressEnter())
	return (
		<div className='keyboard-container'>
			<article className='keyboard'>
				{russianAlphabetKeyboard.map((row, indexRow) => (
					<div key={indexRow} className='keyboard-row'>
						{row.map((key, indexCell) => {
							const keyState = alphabet && alphabet[key]
							const keyCN = classNames('keyboard-key', keyState)
							return (
								<BorderedButton
									key={indexCell}
									variant='withoutShadow'
									background='secondary'
									className={keyCN}
									text={key}
									onClick={
										onPressKey && (() => onPressKey(key))
									}
								/>
							)
						})}
						{indexRow === 1 && (
							<BorderedButton
								variant='withoutShadow'
								background='primary'
								className='keyboard-key backspace'
								icon={
									<SVG
										src='../../../icons/backspace.svg'
										width={32}
									/>
								}
								onClick={onPressBackspace}
							/>
						)}
						{indexRow === 2 && (
							<BorderedButton
								variant='withoutShadow'
								background='primary'
								className='keyboard-key enter'
								icon={
									<SVG
										src='../../../icons/enter.svg'
										width={32}
									/>
								}
								text='enter'
								onClick={onPressEnter}
							/>
						)}
					</div>
				))}
			</article>
		</div>
	)
}

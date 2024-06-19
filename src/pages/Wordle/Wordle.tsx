import { useParams } from 'react-router-dom'
import './Wordle.style.scss'
import { russianAlphabet } from '../../constants/alphabet'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
	clearLetter,
	setSecretWord,
	setGameVariant,
	setWarning,
	wrightLetter,
} from '../../redux/slices/wordle.slice'
import { wordLength } from '../../constants/settings'
import { useKeyPressEvent } from 'react-use'
import React from 'react'
import { AlphabetLetter } from '../../types'
import { message } from 'antd'
import { useEncryptDecrypt } from '../../hooks/useEncryptDecrypt'
import { fetchWord } from '../../redux/thunks/fetchWord'
import { fetchRandomWord } from '../../redux/thunks/fetchRandomWord'

export const Wordle = () => {
	//const { gameStage, warning, gridState, curentPosition } = useAppSelector(
	//	state => state.wordle
	//)

	//const dispatch = useAppDispatch()

	//const { word } = useParams()

	//russianAlphabet.forEach(char => {
	//	useKeyPressEvent(
	//		char,
	//		() =>
	//			curentPosition.letter < wordLength &&
	//			gameStage === 'solve' &&
	//			handlePressKey(char)
	//	)
	//})

	//useKeyPressEvent(
	//	'Enter',
	//	() =>
	//		curentPosition.letter !== 0 &&
	//		gameStage === 'solve' &&
	//		handlePressEnter()
	//)
	//useKeyPressEvent(
	//	'Backspace',
	//	() =>
	//		curentPosition.letter !== 0 &&
	//		gameStage === 'solve' &&
	//		handlePressBackspace()
	//)

	//const handlePressKey = (key: AlphabetLetter) => {
	//	dispatch(wrightLetter({ key }))
	//}

	//const handlePressBackspace = () => {
	//	dispatch(clearLetter())
	//}
	//const handlePressEnter = () => {
	//	if (curentPosition.letter === wordLength) {
	//		dispatch(
	//			fetchWord({
	//				lang: 'ru-ru',
	//				word: gridState[curentPosition.row]
	//					.map(cell => cell.letter)
	//					.join(''),
	//			})
	//		)
	//	} else {
	//		warning !== 'short' && dispatch(setWarning({ warning: 'short' }))
	//	}
	//}

	//React.useEffect(() => {
	//	if (warning === 'notExist') {
	//		message.open({
	//			type: 'warning',
	//			content: 'Такого слова не существует',
	//			duration: 0,
	//		})
	//	}
	//	if (warning === 'short') {
	//		message.open({
	//			type: 'warning',
	//			content: 'Слишком короткое слово',
	//			duration: 0,
	//		})
	//	}
	//	let timeout = setTimeout(() => {
	//		message.destroy()
	//		warning !== null && dispatch(setWarning({ warning: null }))
	//	}, 2000)
	//	return () => {
	//		clearTimeout(timeout)
	//	}
	//}, [warning])

	//React.useEffect(() => {
	//	if (word) {
	//		dispatch(setGameVariant({ gameVariant: 'solveURL' }))
	//		const decryptedWord = useEncryptDecrypt(word, 'wordly')
	//		dispatch(setSecretWord({ word: decryptedWord }))
	//	} else {
	//		dispatch(setGameVariant({ gameVariant: 'solveRandom' }))
	//		dispatch(fetchRandomWord({ lang: 'ru', length: 5 }))
	//	}
	//}, [word])

	return (
		<div className='wordle'>
			{/*<article className='wordGrid'>
				{gridState.map((row, indexRow) => (
					<div key={indexRow} className='wordGrid-row'>
						{row.map((cell, index) => {
							const cellCN = classNames(
								'wordGrid-cell',
								cell.variant
							)
							return (
								<span key={index} className={cellCN}>
									{cell.letter}
								</span>
							)
						})}
					</div>
				))}
			</article>
			<div>
				{russianAlphabet.map(letter => (
					<button
						key={letter}
						style={{ padding: '8px' }}
						onClick={() =>
							curentPosition.letter < wordLength &&
							gameStage === 'solve' &&
							handlePressKey(letter)
						}
					>
						{letter}
					</button>
				))}
				<button
					style={{ padding: '8px' }}
					onClick={() =>
						curentPosition.letter !== 0 &&
						gameStage === 'solve' &&
						handlePressEnter()
					}
				>
					Enter
				</button>
				<button
					style={{ padding: '8px' }}
					onClick={() =>
						curentPosition.letter !== 0 &&
						gameStage === 'solve' &&
						handlePressBackspace()
					}
				>
					Backspace
				</button>
			</div>*/}
		</div>
	)
}

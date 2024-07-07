import './WordleGamePlay.style.scss'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { AlphabetLetter } from '../../../../types'
import { WORD_LENGTH } from '../../../../constants/settings'
import {
	clearLetter,
	setGameStage,
	setSecretWord,
	setWarning,
	wrightLetter,
} from '../../../../redux/slices/wordle.slice'
import { fetchWord } from '../../../../redux/thunks/fetchWord'
import { fetchRandomWord } from '../../../../redux/thunks/fetchRandomWord'
import { useEncryptDecrypt } from '../../../../hooks/useEncryptDecrypt'
import { message } from 'antd'
import { WordleFuncButtons } from '../WordleFuncButtons/WordleFuncButtons'
import { WordleGrid } from '../WordleGrid/WordleGrid'
import { Keyboard } from '../../../Keyboard/Keyboard'

interface Props {
	word?: string
}

export const WordleGamePlay = ({ word }: Props) => {
	const { gameStage, warning, gridState, alphabet, curentPosition } =
		useAppSelector(state => state.wordle)

	const dispatch = useAppDispatch()

	const handlePressKey = (key: AlphabetLetter) => {
		curentPosition.letter < WORD_LENGTH &&
			gameStage === 'solve' &&
			dispatch(wrightLetter({ key }))
	}
	const handlePressBackspace = () => {
		curentPosition.letter !== 0 &&
			gameStage === 'solve' &&
			dispatch(clearLetter())
	}
	const handlePressEnter = () => {
		if (gameStage !== 'solve') return
		if (curentPosition.letter === WORD_LENGTH) {
			dispatch(
				fetchWord({
					lang: 'ru-ru',
					word: gridState[curentPosition.row]
						.map(cell => cell.letter)
						.join(''),
				})
			)
		} else {
			warning !== 'short' && dispatch(setWarning({ warning: 'short' }))
		}
	}

	React.useEffect(() => {
		if (warning === 'notExist') {
			message.open({
				type: 'warning',
				content: 'Такого слова не существует',
				duration: 0,
			})
		}
		if (warning === 'short') {
			message.open({
				type: 'warning',
				content: 'Слишком короткое слово',
				duration: 0,
			})
		}
		let timeout = setTimeout(() => {
			message.destroy()
			warning !== null && dispatch(setWarning({ warning: null }))
		}, 2000)
		return () => {
			clearTimeout(timeout)
		}
	}, [warning])

	React.useEffect(() => {
		if (word) {
			const decryptedWord = useEncryptDecrypt({
				message: word,
			}).decrypt
			console.log(decryptedWord)
			dispatch(setGameStage({ gameStage: 'solve' }))
			dispatch(setSecretWord({ word: decryptedWord }))
		} else {
			dispatch(fetchRandomWord({ lang: 'ru', length: 5 }))
		}
	}, [word])

	return (
		<>
			<span>
				<WordleFuncButtons />
				<span>
					<WordleGrid gridState={gridState} />
				</span>
			</span>
			<Keyboard
				alphabet={alphabet}
				onPressKey={handlePressKey}
				onPressBackspace={handlePressBackspace}
				onPressEnter={handlePressEnter}
			/>
		</>
	)
}

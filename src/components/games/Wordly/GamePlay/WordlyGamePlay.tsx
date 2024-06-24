import './WordlyGamePlay.style.scss'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { AlphabetLetter } from '../../../../types'
import { WORD_LENGTH } from '../../../../constants/settings'
import {
	clearLetter,
	setGameVariant,
	setSecretWord,
	setWarning,
	wrightLetter,
} from '../../../../redux/slices/wordle.slice'
import { fetchWord } from '../../../../redux/thunks/fetchWord'
import { fetchRandomWord } from '../../../../redux/thunks/fetchRandomWord'
import { useSearchParams } from 'react-router-dom'
import { useEncryptDecrypt } from '../../../../hooks/useEncryptDecrypt'
import { message } from 'antd'
import { WordlyFuncButtons } from '../WordlyFuncButtons/WordlyFuncButtons'
import { WordlyGrid } from '../WordlyGrid/WordlyGrid'
import { Keyboard } from '../../../Keyboard/Keyboard'

export const WordlyGamePlay = () => {
	const { gameStage, warning, gridState, alphabet, curentPosition } =
		useAppSelector(state => state.wordle)

	const dispatch = useAppDispatch()

	const [searchParams, setSearchParams] = useSearchParams()
	const word = searchParams.get('word')

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
			dispatch(setGameVariant({ gameVariant: 'solveURL' }))
			const decryptedWord = useEncryptDecrypt({
				message: word,
			}).decrypt
			dispatch(setSecretWord({ word: decryptedWord }))
		} else {
			dispatch(setGameVariant({ gameVariant: 'solveRandom' }))
			dispatch(fetchRandomWord({ lang: 'ru', length: 5 }))
		}
	}, [word])
	return (
		<>
			<span>
				<WordlyFuncButtons />
				<span>
					<WordlyGrid gridState={gridState} />
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

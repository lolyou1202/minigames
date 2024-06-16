import { useParams } from 'react-router-dom'
import './Wordle.style.scss'
import { russianAlphabet } from '../../constants/alphabet'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
	clearLetter,
	fetchWord,
	setCurrentWord,
	wrightLetter,
} from '../../redux/slices/wordle.slice'
import { wordLength } from '../../constants/settings'
import { useKeyPressEvent } from 'react-use'
import { useEffect } from 'react'

export const Wordle = () => {
	const { gridState, curentPosition } = useAppSelector(state => state.wordle)

	const dispatch = useAppDispatch()

	const { word } = useParams()

	russianAlphabet.forEach(char => {
		useKeyPressEvent(
			char,
			() => curentPosition.letter < wordLength && handlePressKey(char)
		)
	})

	useKeyPressEvent(
		'Enter',
		() => curentPosition.letter !== 0 && handlePressEnter()
	)
	useKeyPressEvent(
		'Backspace',
		() => curentPosition.letter !== 0 && handlePressBackspace()
	)

	const handlePressKey = (key: string) => {
		dispatch(wrightLetter({ key }))
	}

	const handlePressBackspace = () => {
		dispatch(clearLetter())
	}
	const handlePressEnter = () => {
		dispatch(
			fetchWord({
				lang: 'ru-ru',
				word: gridState[curentPosition.row]
					.map(cell => cell.letter)
					.join(''),
			})
		)
	}

	useEffect(() => {
		word && dispatch(setCurrentWord({ word }))
	}, [word])

	return (
		<div className='wordle'>
			<article className='wordGrid'>
				{gridState.map((row, indexRow) => (
					<div key={indexRow} className='wordGrid-row'>
						{row.map((cell, index) => {
							const cellCN = classNames(
								'wordGrid-cell',
								cell.state
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
		</div>
	)
}

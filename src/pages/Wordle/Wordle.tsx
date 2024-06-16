import { useParams } from 'react-router-dom'
import './Wordle.style.scss'
import { russianAlphabet } from '../../constants/alphabet'
import { useKeyPressEvent } from 'react-use'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearLetter, enterWord, wrightLetter } from '../../redux/slices/wordle.slice'
import { wordLength } from '../../constants/settings'

export const Wordle = () => {
	const { gridState, curentPosition } = useAppSelector(state => state.wordle)

	const dispatch = useAppDispatch()

	//let { word } = useParams()

	russianAlphabet.forEach(char => {
		useKeyPressEvent(
			char,
			() => curentPosition.letter < wordLength && handlePressKey(char)
		)
	})

	useKeyPressEvent('Enter', () => handlePressEnter())
	useKeyPressEvent('Backspace', () => handlePressBackspace())

	const handlePressKey = (key: string) => {
		dispatch(wrightLetter({ key }))
	}

	const handlePressBackspace = () => {
		dispatch(clearLetter())
	}
	const handlePressEnter = () => {
		dispatch(enterWord())
	}

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

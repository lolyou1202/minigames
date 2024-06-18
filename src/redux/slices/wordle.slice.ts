import { createSlice } from '@reduxjs/toolkit'
import { rowCount, wordLength } from '../../constants/settings'
import { AlphabetLetter, AlphabetState, CellState } from '../../types'
import { russianAlphabet } from '../../constants/alphabet'
import { fetchWord } from '../thunks/fetchWord'
import { fetchRandomWord } from '../thunks/fetchRandomWord'

export type LetterPosition = { row: number; letter: number }

const initialState: {
	gameVariant: 'solveURL' | 'solveRandom'
	gameStage: 'solve' | 'win' | 'lose'
	warning: 'short' | 'notExist' | null
	gridState: CellState[][]
	alphabet: AlphabetState
	secretWord: string | null
	curentPosition: LetterPosition
} = {
	gameVariant: 'solveRandom',
	gameStage: 'solve',
	warning: null,
	gridState: [...Array(rowCount)].map((): CellState[] =>
		[...Array(wordLength)].map(
			(): CellState => ({
				variant: 'empty',
				letter: '',
			})
		)
	),
	alphabet: russianAlphabet.reduce(
		(a, v) => ({ ...a, [v]: 'empty' }),
		{} as AlphabetState
	),
	secretWord: null,
	curentPosition: { row: 0, letter: 0 },
}

const wordleSlice = createSlice({
	name: 'wordle',
	initialState,
	reducers: create => ({
		setSecretWord: create.reducer<{ word: string }>((state, action) => {
			const { word } = action.payload
			state.secretWord = word
		}),
		wrightLetter: create.reducer<{ key: AlphabetLetter }>(
			(state, action) => {
				const { key } = action.payload
				const { row, letter } = state.curentPosition

				state.gridState[row][letter].letter = key
				state.curentPosition.letter = ++state.curentPosition.letter
			}
		),
		clearLetter: state => {
			const { row, letter } = state.curentPosition

			if (letter !== 0) {
				state.gridState[row][letter - 1].letter = ''
				state.curentPosition.letter = --state.curentPosition.letter
			}
		},
		validateWord: state => {
			let curentWord = [...state.secretWord!]
			const { row } = state.curentPosition

			state.gridState[row].forEach((cell, index) => {
				if (cell.letter === '') return
				if (cell.letter === curentWord[index]) {
					curentWord[index] = '0'
					cell.variant = 'match'
					if (state.alphabet[cell.letter] !== 'match') {
						state.alphabet[cell.letter] = 'match'
					}
				} else if (curentWord.includes(cell.letter)) {
					const i = curentWord.indexOf(cell.letter)
					curentWord[i] = '1'
					cell.variant = 'inaccurate'
					if (
						state.alphabet[cell.letter] !== 'inaccurate' &&
						state.alphabet[cell.letter] !== 'match'
					) {
						state.alphabet[cell.letter] = 'inaccurate'
					}
				} else {
					cell.variant = 'miss'
					if (
						state.alphabet[cell.letter] !== 'inaccurate' &&
						state.alphabet[cell.letter] !== 'match' &&
						state.alphabet[cell.letter] !== 'miss'
					) {
						state.alphabet[cell.letter] = 'miss'
					}
				}
			})
		},
		setWarning: create.reducer<{ warning: 'short' | 'notExist' | null }>(
			(state, action) => {
				const { warning } = action.payload
				if (state.warning !== warning) {
					state.warning = warning
				}
			}
		),
		acceptWord: state => {
			if (state.gameStage === 'solve') {
				state.curentPosition = {
					row: ++state.curentPosition.row,
					letter: 0,
				}
			}
		},
		checkGameStage: state => {
			const { row } = state.curentPosition

			const isWin = state.gridState[row].every(
				cell => cell.variant === 'match'
			)
			if (isWin) {
				state.gameStage = 'win'
			}
			if (row === rowCount) {
				state.gameStage = 'lose'
			}
		},
		setGameVariant: create.reducer<{
			gameVariant: 'solveURL' | 'solveRandom'
		}>((state, action) => {
			const { gameVariant } = action.payload
			state.gameVariant = gameVariant
		}),
		setGameStage: create.reducer<{ gameStage: 'solve' | 'win' | 'lose' }>(
			(state, action) => {
				const { gameStage } = action.payload
				state.gameStage = gameStage
			}
		),
	}),
	extraReducers(builder) {
		builder
			.addCase(fetchWord.fulfilled, (state, action) => {
				const payload = action.payload

				if (!payload) {
					wordleSlice.caseReducers.setWarning(state, {
						payload: { warning: 'notExist' },
						type: 'setWarning',
					})
					return
				}

				wordleSlice.caseReducers.validateWord(state)
				wordleSlice.caseReducers.checkGameStage(state)
				wordleSlice.caseReducers.acceptWord(state)
			})
			.addCase(fetchRandomWord.fulfilled, (state, action) => {
				const payload = action.payload
				state.secretWord = payload
			})
	},
})

export const {
	setSecretWord,
	wrightLetter,
	clearLetter,
	validateWord,
	setWarning,
	acceptWord,
	checkGameStage,
	setGameVariant,
	setGameStage,
} = wordleSlice.actions
export default wordleSlice.reducer

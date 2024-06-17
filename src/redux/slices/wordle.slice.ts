import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rowCount, wordLength } from '../../constants/settings'
import axios from 'axios'
import { AlphabetLetter, AlphabetState, CellState } from '../../types'
import { russianAlphabet } from '../../constants/alphabet'

export type LetterPosition = { row: number; letter: number }

type ThunkArgs = {
	lang: string
	word: string
}
type ResultType = {
	head: {}
	def:
		| {
				text: string
				pos: string
				tr: [
					{
						text: string
						pos: string
						syn: { text: string }[]
						mean: { text: string }[]
						ex: {
							text: string
							tr: { text: string }[]
						}[]
					}
				]
		  }[]
		| []
}

const apiKey = import.meta.env.VITE_DICTIONARY_APY_KEY
const apiUrl = import.meta.env.VITE_DICTIONARY_URL

export const fetchWord = createAsyncThunk<string | undefined, ThunkArgs>(
	'wordle/fetchWord',
	async ({ lang, word }, { rejectWithValue }) => {
		try {
			const response = await axios<ResultType>(
				`${apiUrl}/api/v1/dicservice.json/lookup?key=${apiKey}&lang=${lang}&text=${word}`
			)
			return response.data.def[0]?.text
		} catch (err) {
			throw rejectWithValue(err)
		}
	}
)

const initialState: {
	gameStage: 'solve' | 'win' | 'lose'
	warning: 'short' | 'notExist' | null
	gridState: CellState[][]
	alphabet: AlphabetState
	curentWord: string | null
	curentPosition: LetterPosition
} = {
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
	curentWord: null,
	curentPosition: { row: 0, letter: 0 },
}

const wordleSlice = createSlice({
	name: 'wordle',
	initialState,
	reducers: create => ({
		setCurrentWord: create.reducer<{ word: string }>((state, action) => {
			const { word } = action.payload
			state.curentWord = word
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
			let curentWord = [...state.curentWord!]
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
		setGameStage: create.reducer<{ gameStage: 'solve' | 'win' | 'lose' }>(
			(state, action) => {
				const { gameStage } = action.payload
				state.gameStage = gameStage
			}
		),
	}),
	extraReducers(builder) {
		builder.addCase(fetchWord.fulfilled, (state, action) => {
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
	},
})

export const {
	setCurrentWord,
	wrightLetter,
	clearLetter,
	validateWord,
	setWarning,
	acceptWord,
} = wordleSlice.actions
export default wordleSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rowCount, wordLength } from '../../constants/settings'
import axios from 'axios'

export type LetterPosition = { row: number; letter: number }

type ThunkArgs = {
	lang: string
	word: string
}
type ResultType = {
	head: {}
	def: {
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
}
export const fetchWord = createAsyncThunk<boolean, ThunkArgs>(
	'wordle/fetchWord',
	async ({ lang, word }, { rejectWithValue }) => {
		try {
			const response = await axios<ResultType>(
				`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20240616T160432Z.bde39151ccb3cf9d.4405362078288211691f88631895a7a924e78100&lang=${lang}&text=${word}`
			)
			return response.data.def.length !== 0
		} catch (err) {
			throw rejectWithValue(err)
		}
	}
)

const initialState: {
	gridState: {
		state: 'empty' | 'match' | 'inaccurate' | 'miss'
		letter: string
	}[][]
	curentWord: string | null
	curentPosition: LetterPosition
} = {
	gridState: Array(rowCount).fill(
		Array(wordLength).fill({
			state: 'empty',
			letter: '',
		})
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
		wrightLetter: create.reducer<{ key: string }>((state, action) => {
			const { key } = action.payload
			const { row, letter } = state.curentPosition

			state.gridState[row][letter].letter = key
			state.curentPosition.letter = ++state.curentPosition.letter
		}),
		clearLetter: state => {
			const { row, letter } = state.curentPosition

			if (letter !== 0) {
				state.gridState[row][letter - 1].letter = ''
				state.curentPosition.letter = --state.curentPosition.letter
			}
		},
		asd: create.reducer<{ word: string }>((state, action) => {
			let { word } = action.payload
			const { row, letter } = state.curentPosition

			state.gridState[row].forEach((cell, index) => {
				if (cell.letter === word[index]) {
					cell.state = 'match'
					const charArray = [...word]
					charArray[index] = '0'
					const string = charArray.join('')
					word = string
				} else if (word.includes(cell.letter)) {
				}
			})
		}),
		acceptWord: state => {
			state.curentPosition = {
				row: ++state.curentPosition.row,
				letter: 0,
			}
		},
	}),
	extraReducers(builder) {
		builder.addCase(fetchWord.fulfilled, (state, action) => {
			const payload = action.payload

			if (!payload) return

			wordleSlice.caseReducers.acceptWord(state)
		})
	},
})

export const { setCurrentWord, wrightLetter, clearLetter, acceptWord } =
	wordleSlice.actions
export default wordleSlice.reducer

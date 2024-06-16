import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { rowCount, wordLength } from '../../constants/settings'

export type LetterPosition = { row: number; letter: number }

const initialState: {
	gridState: {
		state: 'empty' | 'match' | 'inaccurate' | 'miss'
		letter: string
	}[][]
	curentPosition: LetterPosition
} = {
	gridState: Array(rowCount).fill(
		Array(wordLength).fill({
			state: 'empty',
			letter: '',
		})
	),
	curentPosition: { row: 0, letter: 0 },
}

const wordleSlice = createSlice({
	name: 'wordle',
	initialState,
	reducers: {
		wrightLetter: (state, action: PayloadAction<{ key: string }>) => {
			const { key } = action.payload
			const { row, letter } = state.curentPosition

			state.gridState[row][letter].letter = key
			state.curentPosition.letter = ++state.curentPosition.letter
		},
		clearLetter: state => {
			const { row, letter } = state.curentPosition

			if (letter !== 0) {
				state.gridState[row][letter - 1].letter = ''
				state.curentPosition.letter = --state.curentPosition.letter
			}
		},
		enterWord: state => {
			state.curentPosition = {
				row: ++state.curentPosition.row,
				letter: 0,
			}
		},
	},
})

export const { wrightLetter, clearLetter, enterWord } = wordleSlice.actions
export default wordleSlice.reducer

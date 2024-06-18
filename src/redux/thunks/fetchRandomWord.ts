import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type ThunkArgs = {
	lang: string
	length: number
}

export const fetchRandomWord = createAsyncThunk<string, ThunkArgs>(
	'wordle/fetchRandomWord',
	async ({ lang, length }, { rejectWithValue }) => {
		try {
			const response = await axios<string[]>(
				`./words/words-${length}-${lang}.json`
			)
			return response.data[
				Math.floor(Math.random() * response.data.length)
			]
		} catch (err) {
			throw rejectWithValue(err)
		}
	}
)

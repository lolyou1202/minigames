import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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
	'wordly/fetchWord',
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

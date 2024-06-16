import { configureStore } from '@reduxjs/toolkit'
import wordleReducer from './slices/wordle.slice'

const store = configureStore({
	reducer: {
		wordle: wordleReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

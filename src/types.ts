import { russianAlphabet } from './constants/alphabet'

export type CellVariant = 'empty' | 'match' | 'inaccurate' | 'miss'
export type CellState = {
	variant: CellVariant
	letter: AlphabetLetter | ''
}
export type AlphabetLetter = (typeof russianAlphabet)[number]
export type AlphabetState = {
	[key in AlphabetLetter]: CellVariant
}

export type LocationState = null | {
	from: string[]
	[key: string]: any
}
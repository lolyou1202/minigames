import './WordlyGrid.style.scss'
import { CellState } from '../../../../types'
import { WordlyRow } from './WordlyRow'

interface Props {
	gridState: CellState[][]
}

export const WordlyGrid = ({ gridState }: Props) => {
	return (
		<article className='wordGrid'>
			{gridState.map((row, index) => (
				<WordlyRow key={index} row={row} />
			))}
		</article>
	)
}

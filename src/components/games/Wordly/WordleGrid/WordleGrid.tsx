import './WordleGrid.style.scss'
import { CellState } from '../../../../types'
import { WordleRow } from './WordleRow'

interface Props {
	gridState: CellState[][]
}

export const WordleGrid = ({ gridState }: Props) => {
	return (
		<article className='wordGrid'>
			{gridState.map((row, index) => (
				<WordleRow key={index} row={row} />
			))}
		</article>
	)
}

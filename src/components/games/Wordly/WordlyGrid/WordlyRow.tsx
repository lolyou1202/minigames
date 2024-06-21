import { CellState } from '../../../../types'
import classNames from 'classnames'
import { WordlyCell } from './WordlyCell'

interface Props {
	row: CellState[]
}

export const WordlyRow = ({ row }: Props) => {
	return (
		<div className='wordGrid-row'>
			{row.map(({ letter, variant }, index) => {
				const cellCN = classNames('wordGrid-cell', variant)
				return (
					<WordlyCell key={index} text={letter} className={cellCN} />
				)
			})}
		</div>
	)
}

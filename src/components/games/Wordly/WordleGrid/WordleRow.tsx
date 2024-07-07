import { CellState } from '../../../../types'
import { WordleCell } from './WordleCell'

interface Props {
	row: CellState[]
}

export const WordleRow = ({ row }: Props) => {
	return (
		<div className='wordGrid-row'>
			{row.map(({ letter, variant }, index) => (
				<WordleCell
					key={index}
					text={letter}
					background={variant}
					className='wordGrid-cell'
				/>
			))}
		</div>
	)
}

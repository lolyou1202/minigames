import './Wordle.style.scss'
import { WordlyGamePlay } from '../../components/games/Wordly/GamePlay/WordlyGamePlay'
import { StartMenu } from '../../components/games/Wordly/StartMenu/StartMenu'

export const Wordle = () => {
	return (
		<div className='wordle'>
			<WordlyGamePlay />
			{/*<StartMenu />*/}
		</div>
	)
}

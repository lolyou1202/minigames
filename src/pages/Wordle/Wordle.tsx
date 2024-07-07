import './Wordle.style.scss'
import { useSearchParams } from 'react-router-dom'
import { WordleGamePlay } from '../../components/games/Wordly/GamePlay/WordleGamePlay'
import { StartMenu } from '../../components/games/Wordly/StartMenu/StartMenu'
import { ModalTemplate } from '../../components/modal/ModalTemplate'

export const Wordle = () => {
	const [searchParams] = useSearchParams()
	const word = searchParams.get('word')

	return (
		<div className='wordle'>
			{word ? <WordleGamePlay word={word} /> : <StartMenu />}
			{/*<ModalTemplate />*/}
		</div>
	)
}

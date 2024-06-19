import './AppLayout.style.scss'
import { Sidebar } from '../../components/Sidebar/Sidebar'

export const AppLayout = () => {
	return (
		<div className='appLayout'>
			<Sidebar />
			<main className='main'></main>
		</div>
	)
}

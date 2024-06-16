import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import App from './App.tsx'
import './index.style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
)

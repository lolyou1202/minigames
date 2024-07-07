import './ModalTemplate.styel.scss'
import Modal from '@mui/material/Modal'

export const ModalTemplate = () => {
	return (
		<Modal
			open={true}
			container={() => document.getElementById('main')}
		>
			<>
				<p>Some contents...</p>
			</>
		</Modal>
	)
}

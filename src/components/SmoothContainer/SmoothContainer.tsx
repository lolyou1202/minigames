import './SmoothContainer.style.scss'
import { SmoothCorners, SmoothCornersWrapper } from 'react-smooth-corners'

export const SmoothContainer = () => {
	return (
		<SmoothCornersWrapper
			className='smoothCorners-wrapper'
			corners='4'
			borderRadius='16px'
			shadow='0px 0px 0px 5px rgb(0, 0, 0, 0.1)'
		>
			<SmoothCorners
				className='smoothCorners'
				corners='5'
				style={{
					width: '60px',
					height: '60px',
				}}
				borderRadius='16px'
			/>
		</SmoothCornersWrapper>
	)
}
